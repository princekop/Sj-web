"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function MinecraftWorld() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x87ceeb, 30, 120)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(20, 15, 25)
    camera.lookAt(0, 0, 0)

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x87ceeb)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    containerRef.current.appendChild(renderer.domElement)

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // ========== LOAD REAL MINECRAFT TEXTURES ==========
    const textureLoader = new THREE.TextureLoader()
    const BASE_URL = 'https://assets.mcasset.cloud/1.21.10/assets/minecraft/textures/block'
    
    // Load textures with proper settings
    const loadMinecraftTexture = (name: string) => {
      const texture = textureLoader.load(`${BASE_URL}/${name}`)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      return texture
    }

    // Grass block textures
    const grassTopTex = loadMinecraftTexture('grass_block_top.png')
    const grassSideTex = loadMinecraftTexture('grass_block_side.png') 
    const dirtTex = loadMinecraftTexture('dirt.png')
    
    // Tree textures
    const oakLogTex = loadMinecraftTexture('oak_log.png')
    const oakLogTopTex = loadMinecraftTexture('oak_log_top.png')
    const oakLeavesTex = loadMinecraftTexture('oak_leaves.png')
    oakLeavesTex.transparent = true
    
    // Old texture generation code for reference
    const createBackupTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 16
      canvas.height = 16
      const ctx = canvas.getContext('2d')!
      
      // Simple fallback pattern
      const basePattern = [
        ['#5cb531','#6fc73e','#5cb531','#6fc73e','#4fa02a','#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#4fa02a','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531'],
        ['#5cb531','#4fa02a','#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#5cb531','#4fa02a','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531'],
        ['#4fa02a','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#4fa02a','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531'],
        ['#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531'],
        ['#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#5cb531'],
        ['#5cb531','#6fc73e','#4fa02a','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#4fa02a','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531'],
        ['#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#7ed957','#5cb531'],
        ['#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e'],
        ['#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531','#6fc73e','#5cb531'],
      ]
      
      for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
          ctx.fillStyle = basePattern[y][x]
          ctx.fillRect(x, y, 1, 1)
        }
      }
      
      return texture
    }

    // ========== GRASS BLOCKS WITH ENHANCED MATERIALS ==========
    const blockSize = 2
    const blocks: THREE.Mesh[] = []
    
    for (let x = -10; x <= 10; x++) {
      for (let z = -10; z <= 10; z++) {
        const materials = [
          new THREE.MeshStandardMaterial({ 
            map: grassSideTex.clone(),
            roughness: 0.8,
            metalness: 0.1,
            envMapIntensity: 0.3
          }),
          new THREE.MeshStandardMaterial({ 
            map: grassSideTex.clone(),
            roughness: 0.8,
            metalness: 0.1,
            envMapIntensity: 0.3
          }),
          new THREE.MeshStandardMaterial({ 
            map: grassTopTex,
            roughness: 0.9,
            metalness: 0,
            envMapIntensity: 0.2
          }),
          new THREE.MeshStandardMaterial({ 
            map: dirtTex,
            roughness: 1.0,
            metalness: 0
          }),
          new THREE.MeshStandardMaterial({ 
            map: grassSideTex.clone(),
            roughness: 0.8,
            metalness: 0.1,
            envMapIntensity: 0.3
          }),
          new THREE.MeshStandardMaterial({ 
            map: grassSideTex.clone(),
            roughness: 0.8,
            metalness: 0.1,
            envMapIntensity: 0.3
          }),
        ]
        
        const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize)
        const block = new THREE.Mesh(geometry, materials)
        
        const noise = (Math.sin(x * 0.5) + Math.cos(z * 0.3)) * 0.4
        block.position.set(x * blockSize, -blockSize / 2 + noise, z * blockSize)
        
        block.castShadow = true
        block.receiveShadow = true
        scene.add(block)
        blocks.push(block)
      }
    }

    // ========== 3D GRASS BLADES WITH ENHANCED SHADING ==========
    const grassBlades: THREE.Mesh[] = []
    const grassBladeBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x4fa02a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      roughness: 0.9,
      metalness: 0,
      emissive: 0x1a3d0a,
      emissiveIntensity: 0.1
    })

    for (let x = -10; x <= 10; x++) {
      for (let z = -10; z <= 10; z++) {
        // Add 4-6 grass blades per block
        const bladesCount = 4 + Math.floor(Math.random() * 3)
        for (let i = 0; i < bladesCount; i++) {
          const bladeHeight = 0.5 + Math.random() * 0.3
          const bladeGeom = new THREE.PlaneGeometry(0.12, bladeHeight)
          const bladeMat = grassBladeBaseMaterial.clone()
          
          // Vary grass blade colors slightly
          const colorVariation = Math.random() * 0.2 - 0.1
          bladeMat.color.setHex(0x4fa02a)
          bladeMat.color.offsetHSL(0, colorVariation, colorVariation * 0.5)
          
          const blade = new THREE.Mesh(bladeGeom, bladeMat)
          
          const offsetX = (Math.random() - 0.5) * 1.5
          const offsetZ = (Math.random() - 0.5) * 1.5
          const noise = (Math.sin(x * 0.5) + Math.cos(z * 0.3)) * 0.4
          
          blade.position.set(
            x * blockSize + offsetX,
            blockSize / 2 + bladeHeight / 2 + noise,
            z * blockSize + offsetZ
          )
          
          blade.rotation.y = Math.random() * Math.PI * 2
          blade.castShadow = true
          blade.userData.baseY = blade.position.y
          blade.userData.swayOffset = Math.random() * Math.PI * 2
          blade.userData.swaySpeed = 0.8 + Math.random() * 0.4
          scene.add(blade)
          grassBlades.push(blade)
        }
      }
    }

    // ========== TREES WITH REAL TEXTURES ==========
    const createTree = (x: number, z: number) => {
      const treeGroup = new THREE.Group()
      
      // Trunk with real oak log texture
      const trunkGeom = new THREE.BoxGeometry(0.8, 3, 0.8)
      const trunkMaterials = [
        new THREE.MeshStandardMaterial({ map: oakLogTex.clone(), roughness: 0.9 }),
        new THREE.MeshStandardMaterial({ map: oakLogTex.clone(), roughness: 0.9 }),
        new THREE.MeshStandardMaterial({ map: oakLogTopTex.clone(), roughness: 0.9 }),
        new THREE.MeshStandardMaterial({ map: oakLogTopTex.clone(), roughness: 0.9 }),
        new THREE.MeshStandardMaterial({ map: oakLogTex.clone(), roughness: 0.9 }),
        new THREE.MeshStandardMaterial({ map: oakLogTex.clone(), roughness: 0.9 }),
      ]
      const trunk = new THREE.Mesh(trunkGeom, trunkMaterials)
      trunk.position.y = 1.5
      trunk.castShadow = true
      trunk.receiveShadow = true
      treeGroup.add(trunk)
      
      // Leaves with real oak leaves texture
      const leavesMat = new THREE.MeshStandardMaterial({ 
        map: oakLeavesTex.clone(),
        transparent: true,
        alphaTest: 0.5,
        roughness: 0.9,
        side: THREE.DoubleSide
      })
      
      // Bottom layer (larger)
      for (let ly = 0; ly < 2; ly++) {
        for (let lx = -1; lx <= 1; lx++) {
          for (let lz = -1; lz <= 1; lz++) {
            if (lx === 0 && lz === 0 && ly === 0) continue
            
            const leafGeom = new THREE.BoxGeometry(0.9, 0.9, 0.9)
            const leaf = new THREE.Mesh(leafGeom, leavesMat.clone())
            leaf.position.set(lx * 0.9, 3 + ly * 0.9, lz * 0.9)
            leaf.castShadow = true
            treeGroup.add(leaf)
          }
        }
      }
      
      // Top layer (smaller)
      const topLeafGeom = new THREE.BoxGeometry(0.9, 0.9, 0.9)
      const topLeaf = new THREE.Mesh(topLeafGeom, leavesMat.clone())
      topLeaf.position.y = 4.8
      topLeaf.castShadow = true
      treeGroup.add(topLeaf)
      
      const noise = (Math.sin(x * 0.5) + Math.cos(z * 0.3)) * 0.3
      treeGroup.position.set(x * blockSize, noise, z * blockSize)
      scene.add(treeGroup)
      
      return treeGroup
    }

    // Place trees at specific positions
    const trees = [
      createTree(-6, -6),
      createTree(7, -5),
      createTree(-4, 8),
      createTree(5, 6),
      createTree(-8, 3),
      createTree(8, -8),
    ]

    // ========== CLOUDS ==========
    const clouds: THREE.Mesh[] = []
    const cloudMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.8
    })

    for (let i = 0; i < 12; i++) {
      const cloudGroup = new THREE.Group()
      
      // Create fluffy cloud with multiple spheres
      for (let j = 0; j < 5 + Math.floor(Math.random() * 3); j++) {
        const size = 1 + Math.random() * 1.5
        const cloudPart = new THREE.Mesh(
          new THREE.SphereGeometry(size, 8, 8),
          cloudMaterial.clone()
        )
        cloudPart.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 1,
          (Math.random() - 0.5) * 3
        )
        cloudGroup.add(cloudPart)
      }
      
      cloudGroup.position.set(
        (Math.random() - 0.5) * 80,
        20 + Math.random() * 15,
        (Math.random() - 0.5) * 80
      )
      
      scene.add(cloudGroup)
      clouds.push(cloudGroup as any)
    }

    // ========== ENHANCED LIGHTING SYSTEM ==========
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Main sun light
    const sunLight = new THREE.DirectionalLight(0xfffaf0, 1.5)
    sunLight.position.set(30, 45, 20)
    sunLight.castShadow = true
    sunLight.shadow.camera.left = -50
    sunLight.shadow.camera.right = 50
    sunLight.shadow.camera.top = 50
    sunLight.shadow.camera.bottom = -50
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.bias = -0.001
    scene.add(sunLight)

    // Hemisphere light for sky/ground color
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x5d8a3a, 0.4)
    scene.add(hemiLight)

    // Fill light for softer shadows
    const fillLight = new THREE.DirectionalLight(0xadd8e6, 0.3)
    fillLight.position.set(-20, 20, -20)
    scene.add(fillLight)

    // ========== INTERACTIVE ANIMATION ==========
    let time = 0
    let autoRotate = true
    let lastMouseMoveTime = Date.now()
    
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      time += 0.01

      // Check if mouse moved recently (within last 2 seconds)
      if (Date.now() - lastMouseMoveTime < 2000) {
        autoRotate = false
      } else {
        autoRotate = true
      }

      // Interactive Camera Control
      const radius = 25
      const baseAngle = time * 0.08
      
      if (autoRotate) {
        // Auto-rotate camera
        camera.position.x = Math.sin(baseAngle) * radius
        camera.position.z = Math.cos(baseAngle) * radius
        camera.position.y = 15
      } else {
        // Mouse-controlled camera with smooth interpolation
        const targetX = Math.sin(baseAngle) * radius + mouseRef.current.x * 8
        const targetZ = Math.cos(baseAngle) * radius + mouseRef.current.y * 8
        const targetY = 15 - mouseRef.current.y * 5
        
        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.z += (targetZ - camera.position.z) * 0.05
        camera.position.y += (targetY - camera.position.y) * 0.05
      }
      
      camera.lookAt(0, 2, 0)

      // Enhanced grass blade animation (wind with interactive elements)
      grassBlades.forEach((blade) => {
        const swayOffset = blade.userData.swayOffset
        const swaySpeed = blade.userData.swaySpeed
        
        // Base wind sway
        const windStrength = 0.15
        const windX = Math.sin(time * swaySpeed + swayOffset) * windStrength
        
        // Add mouse influence
        const distX = blade.position.x - (mouseRef.current.x * 10)
        const distZ = blade.position.z - (mouseRef.current.y * 10)
        const dist = Math.sqrt(distX * distX + distZ * distZ)
        const mouseInfluence = Math.max(0, 1 - dist / 20) * 0.1
        
        blade.rotation.x = windX + mouseInfluence
        blade.rotation.z = Math.sin(time * swaySpeed * 0.7 + swayOffset) * windStrength * 0.5
      })

      // Animate clouds with parallax
      clouds.forEach((cloud, i) => {
        cloud.position.x += 0.015 + i * 0.002
        if (cloud.position.x > 60) {
          cloud.position.x = -60
        }
        // Subtle vertical bob
        cloud.position.y += Math.sin(time + i) * 0.005
      })

      // Enhanced tree sway with wind
      trees.forEach((tree, i) => {
        const treeSwayX = Math.sin(time * 0.8 + i) * 0.025
        const treeSwayZ = Math.cos(time * 0.6 + i * 0.5) * 0.015
        tree.rotation.x = treeSwayZ
        tree.rotation.z = treeSwayX
      })

      // Gentle block floating (very subtle)
      blocks.forEach((block, i) => {
        const floatAmount = Math.sin(time * 0.5 + i * 0.01) * 0.02
        block.position.y = -blockSize / 2 + (Math.sin(i * 0.5) + Math.cos(i * 0.3)) * 0.4 + floatAmount
      })

      renderer.render(scene, camera)
    }
    
    // Update last mouse move time
    const updateMouseTime = () => {
      lastMouseMoveTime = Date.now()
    }
    window.addEventListener('mousemove', updateMouseTime)

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', updateMouseTime)
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      // Dispose textures
      grassTopTex.dispose()
      grassSideTex.dispose()
      dirtTex.dispose()
      oakLogTex.dispose()
      oakLogTopTex.dispose()
      oakLeavesTex.dispose()
      
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
