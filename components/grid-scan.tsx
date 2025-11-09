"use client"

import React, { useEffect, useRef, useState } from 'react';

type GridScanProps = {
  lineThickness?: number;
  linesColor?: string;
  gridScale?: number;
  scanColor?: string;
  scanOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
};

const vert = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uScanOpacity;
varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 p = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
    vec3 ro = vec3(0.0);
    vec3 rd = normalize(vec3(p, 2.0));
    rd.xy += uSkew * rd.z;

    vec3 color = vec3(0.0);
    float minT = 1e20;
    float gridScale = max(1e-5, uGridScale);
    float fadeStrength = 2.0;
    vec2 gridUV = vec2(0.0);

    for (int i = 0; i < 4; i++)
    {
        float isY = float(i < 2);
        float pos = mix(-0.2, 0.2, float(i)) * isY + mix(-0.5, 0.5, float(i - 2)) * (1.0 - isY);
        float t = (pos - (isY * ro.y + (1.0 - isY) * ro.x)) / (isY * rd.y + (1.0 - isY) * rd.x);
        vec3 h = ro + rd * t;
        bool use = t > 0.0 && t < minT;
        gridUV = use ? mix(h.zy, h.xz, isY) / gridScale : gridUV;
        minT = use ? t : minT;
    }

    vec3 hit = ro + rd * minT;
    float dist = length(hit - ro);
    float fx = fract(gridUV.x);
    float fy = fract(gridUV.y);
    float ax = min(fx, 1.0 - fx);
    float ay = min(fy, 1.0 - fy);
    float halfPx = max(0.0, uLineThickness) * 0.5;
    float lineX = 1.0 - smoothstep(halfPx * fwidth(gridUV.x), (halfPx + 1.0) * fwidth(gridUV.x), ax);
    float lineY = 1.0 - smoothstep(halfPx * fwidth(gridUV.y), (halfPx + 1.0) * fwidth(gridUV.y), ay);
    float lineMask = max(lineX, lineY);
    float fade = exp(-dist * fadeStrength);

    float scanZ = mod(iTime * 0.5, 2.0);
    float scanBand = exp(-50.0 * pow(abs(hit.z - scanZ), 2.0));
    
    vec3 gridCol = uLinesColor * lineMask * fade;
    vec3 scanCol = uScanColor * scanBand * uScanOpacity;
    color = gridCol + scanCol;
    
    float alpha = clamp(max(lineMask * fade, scanBand * uScanOpacity), 0.0, 1.0);
    fragColor = vec4(color, alpha);
}

void main(){
  vec4 c;
  mainImage(c, vUv * iResolution.xy);
  gl_FragColor = c;
}
`;

export const GridScan: React.FC<GridScanProps> = ({
  lineThickness = 1,
  linesColor = '#22c55e',
  scanColor = '#22c55e',
  scanOpacity = 0.4,
  gridScale = 0.1,
  className,
  style
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vert);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, frag);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'iResolution');
    const uTime = gl.getUniformLocation(program, 'iTime');
    const uSkew = gl.getUniformLocation(program, 'uSkew');
    const uLineThickness = gl.getUniformLocation(program, 'uLineThickness');
    const uLinesColor = gl.getUniformLocation(program, 'uLinesColor');
    const uScanColor = gl.getUniformLocation(program, 'uScanColor');
    const uGridScale = gl.getUniformLocation(program, 'uGridScale');
    const uScanOpacity = gl.getUniformLocation(program, 'uScanOpacity');

    const parseColor = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let animId: number;
    const render = (time: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.uniform3f(uRes, canvas.width, canvas.height, 1);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uSkew, mousePos.x * 0.05, -mousePos.y * 0.05);
      gl.uniform1f(uLineThickness, lineThickness);
      gl.uniform3fv(uLinesColor, parseColor(linesColor));
      gl.uniform3fv(uScanColor, parseColor(scanColor));
      gl.uniform1f(uGridScale, gridScale);
      gl.uniform1f(uScanOpacity, scanOpacity);
      
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [lineThickness, linesColor, scanColor, scanOpacity, gridScale, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
    />
  );
};
