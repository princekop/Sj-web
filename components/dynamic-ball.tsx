"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function DynamicBall() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<{
    mesh: THREE.Mesh
    velocity: THREE.Vector3
    position: THREE.Vector3
    targetSection: number
  }>()
  const sceneRef = useRef<THREE.Scene>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create dynamic environment map (cubemap)
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512, {
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter
    })
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget)
    scene.add(cubeCamera)

    // Create sphere geometry with high detail
    const geometry = new THREE.SphereGeometry(0.9, 128, 128)
    
    // Create highly reflective chrome-like material
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 1.0,
      roughness: 0.05,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 1.5,
      color: 0xa855f7, // Purple/pink color
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1,
    })

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Enhanced lighting for better reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xf0f, 2)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x0ff, 2)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xff0, 1.5)
    pointLight3.position.set(0, 5, -5)
    scene.add(pointLight3)

    // Initialize ball state
    ballRef.current = {
      mesh: sphere,
      velocity: new THREE.Vector3(0.02, -0.03, 0),
      position: new THREE.Vector3(3, 2, 0), // Start top right
      targetSection: 0
    }

    sphere.position.copy(ballRef.current.position)

    // Add glow effect (outer sphere)
    const glowGeometry = new THREE.SphereGeometry(1.0, 64, 64)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    })
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
    sphere.add(glowMesh)

    // Animation variables
    let time = 0
    let lastScrollY = 0
    let envUpdateCounter = 0
    const physics = {
      gravity: 0.002,
      bounceDamping: 0.7,
      horizontalSpeed: 0.015,
      bounceHeight: 1.8
    }

    // Scroll handler
    const handleScroll = () => {
      if (!ballRef.current) return
      
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const currentSection = Math.floor(scrollY / windowHeight)
      
      // Detect section change
      if (currentSection !== ballRef.current.targetSection) {
        ballRef.current.targetSection = currentSection
        // Drop the ball when entering new section
        ballRef.current.velocity.y = -0.08
        ballRef.current.position.y = 2.5 // Reset to top
      }
      
      lastScrollY = scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      time += 0.016

      if (ballRef.current) {
        const ball = ballRef.current

        // Horizontal movement (continuous left to right)
        ball.position.x += physics.horizontalSpeed
        
        // Wrap around screen horizontally
        if (ball.position.x > 4.5) {
          ball.position.x = -4.5
        }

        // Apply gravity
        ball.velocity.y -= physics.gravity

        // Update vertical position
        ball.position.y += ball.velocity.y

        // Ground collision detection and bounce
        const groundLevel = -2.2
        if (ball.position.y <= groundLevel) {
          ball.position.y = groundLevel
          // Bounce up
          ball.velocity.y = -ball.velocity.y * physics.bounceDamping
          
          // Stop bouncing if velocity is too low
          if (Math.abs(ball.velocity.y) < 0.01) {
            ball.velocity.y = 0.05 // Keep it bouncing slightly
          }
        }

        // Ceiling boundary
        if (ball.position.y > 2.5) {
          ball.position.y = 2.5
          ball.velocity.y = 0
        }

        // Update mesh position
        ball.mesh.position.copy(ball.position)

        // Rotate for visual effect (based on horizontal movement)
        ball.mesh.rotation.x += physics.horizontalSpeed * 2
        ball.mesh.rotation.y += physics.horizontalSpeed

        // Update environment map (less frequently for performance)
        envUpdateCounter++
        if (envUpdateCounter % 3 === 0) {
          cubeCamera.update(renderer, scene)
        }
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      
      geometry.dispose()
      material.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()
      cubeRenderTarget.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        mixBlendMode: "normal"
      }}
    />
  )
}
