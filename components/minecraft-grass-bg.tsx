"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function MinecraftGrassBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x87ceeb, 20, 80)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(15, 12, 20)
    camera.lookAt(0, 0, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x87ceeb)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create textures for grass block
    const textureLoader = new THREE.TextureLoader()
    
    // Create pixel art textures programmatically
    const createPixelTexture = (colors: string[], size: number = 16) => {
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')!
      
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const colorIndex = Math.floor(Math.random() * colors.length)
          ctx.fillStyle = colors[colorIndex]
          ctx.fillRect(x, y, 1, 1)
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      return texture
    }

    // Grass top texture (green with variations)
    const grassTopColors = ['#5cb531', '#6fc73e', '#4fa02a', '#7ed957']
    const grassTopTexture = createPixelTexture(grassTopColors)

    // Grass side texture (brown bottom, green top)
    const createGrassSideTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 16
      canvas.height = 16
      const ctx = canvas.getContext('2d')!
      
      // Brown dirt bottom
      const brownColors = ['#8b6f47', '#7a5c3d', '#9d7f54', '#6b4e2f']
      for (let y = 4; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          ctx.fillStyle = brownColors[Math.floor(Math.random() * brownColors.length)]
          ctx.fillRect(x, y, 1, 1)
        }
      }
      
      // Green grass top
      const greenColors = ['#5cb531', '#6fc73e', '#4fa02a']
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 16; x++) {
          ctx.fillStyle = greenColors[Math.floor(Math.random() * greenColors.length)]
          ctx.fillRect(x, y, 1, 1)
        }
      }
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      return texture
    }

    // Dirt bottom texture
    const dirtColors = ['#8b6f47', '#7a5c3d', '#9d7f54', '#6b4e2f', '#a38b6a']
    const dirtTexture = createPixelTexture(dirtColors)

    // Create materials for each face of the cube
    const materials = [
      new THREE.MeshStandardMaterial({ map: createGrassSideTexture() }), // right
      new THREE.MeshStandardMaterial({ map: createGrassSideTexture() }), // left
      new THREE.MeshStandardMaterial({ map: grassTopTexture }), // top
      new THREE.MeshStandardMaterial({ map: dirtTexture }), // bottom
      new THREE.MeshStandardMaterial({ map: createGrassSideTexture() }), // front
      new THREE.MeshStandardMaterial({ map: createGrassSideTexture() }), // back
    ]

    // Create multiple grass blocks
    const blocks: THREE.Mesh[] = []
    const gridSize = 12
    const blockSize = 2
    const spacing = blockSize

    for (let x = -gridSize; x < gridSize; x++) {
      for (let z = -gridSize; z < gridSize; z++) {
        const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize)
        const block = new THREE.Mesh(geometry, materials)
        
        // Random height variation
        const heightVariation = Math.random() * 0.5
        block.position.set(
          x * spacing,
          -blockSize / 2 - heightVariation,
          z * spacing
        )
        
        block.castShadow = true
        block.receiveShadow = true
        scene.add(block)
        blocks.push(block)
      }
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 20, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.left = -30
    directionalLight.shadow.camera.right = 30
    directionalLight.shadow.camera.top = 30
    directionalLight.shadow.camera.bottom = -30
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Add sun glow
    const sunGeometry = new THREE.SphereGeometry(2, 32, 32)
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffeb3b })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.position.copy(directionalLight.position)
    scene.add(sun)

    // Animation
    let time = 0
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      time += 0.005

      // Gentle camera rotation
      camera.position.x = Math.sin(time * 0.3) * 12
      camera.position.z = Math.cos(time * 0.3) * 12
      camera.lookAt(0, 0, 0)

      // Gentle block floating animation
      blocks.forEach((block, i) => {
        const offset = i * 0.1
        block.position.y = -1 + Math.sin(time + offset) * 0.1
        block.rotation.y = time * 0.2
      })

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      
      blocks.forEach(block => {
        block.geometry.dispose()
        if (Array.isArray(block.material)) {
          block.material.forEach(mat => mat.dispose())
        }
      })
      grassTopTexture.dispose()
      dirtTexture.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{
        zIndex: 0
      }}
    />
  )
}
