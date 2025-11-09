"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function MinecraftWorld3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, isMoving: false })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x87ceeb)
    scene.fog = new THREE.Fog(0x87ceeb, 50, 150)

    // Camera with better perspective
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(25, 20, 35)
    camera.lookAt(0, 0, 0)

    // Renderer with high quality settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: false, 
      antialias: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    containerRef.current.appendChild(renderer.domElement)

    // ========== LOAD MINECRAFT TEXTURES WITH FALLBACK ==========
    const textureLoader = new THREE.TextureLoader()
    textureLoader.crossOrigin = 'anonymous'
    const BASE_URL = 'https://assets.mcasset.cloud/1.21.10/assets/minecraft/textures/block'
    
    // Create fallback textures
    const createColorTexture = (color: number): THREE.Texture => {
      const canvas = document.createElement('canvas')
      canvas.width = 16
      canvas.height = 16
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`
      ctx.fillRect(0, 0, 16, 16)
      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      return texture
    }
    
    const loadTexture = (name: string, fallbackColor: number): THREE.Texture => {
      const fallback = createColorTexture(fallbackColor)
      
      const texture = textureLoader.load(
        `${BASE_URL}/${name}`,
        (loadedTex) => {
          console.log(`✓ Loaded: ${name}`)
          loadedTex.needsUpdate = true
        },
        undefined,
        (err) => {
          console.error(`✗ Failed to load ${name}:`, err)
        }
      )
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      
      // Return fallback immediately, will be replaced when loaded
      return texture.image ? texture : fallback
    }

    // Core textures with fallback colors
    const textures = {
      grassTop: loadTexture('grass_block_top.png', 0x5cb531),
      grassSide: loadTexture('grass_block_side.png', 0x6b8e23),
      dirt: loadTexture('dirt.png', 0x8b6f47),
      oakLog: loadTexture('oak_log.png', 0x6d5a3e),
      oakLogTop: loadTexture('oak_log_top.png', 0x7a6a4d),
      oakLeaves: loadTexture('oak_leaves.png', 0x228b22),
      stone: loadTexture('stone.png', 0x808080),
      tallGrass: loadTexture('short_grass.png', 0x4fa02a), // Changed from grass.png
    }

    // ========== TERRAIN GENERATION ==========
    const blockSize = 2
    const terrainSize = 15  // Reduced from 25 for better performance
    const blocks: THREE.Mesh[] = []

    // Simple height map function
    const getHeight = (x: number, z: number): number => {
      return Math.floor(
        Math.sin(x * 0.3) * 2 + 
        Math.cos(z * 0.3) * 2 + 
        Math.sin(x * 0.1 + z * 0.1) * 3
      )
    }

    // Create terrain
    for (let x = -terrainSize; x <= terrainSize; x++) {
      for (let z = -terrainSize; z <= terrainSize; z++) {
        const height = getHeight(x, z)
        
        // Stack blocks vertically
        for (let y = -3; y <= height; y++) {
          const isTop = y === height
          const isStone = y < height - 2
          
          let materials: THREE.Material[]
          
          if (isTop) {
            // Grass block on top
            materials = [
              new THREE.MeshStandardMaterial({ 
                map: textures.grassSide, 
                roughness: 0.85,
                metalness: 0,
                color: 0xffffff
              }),
              new THREE.MeshStandardMaterial({ 
                map: textures.grassSide, 
                roughness: 0.85,
                metalness: 0,
                color: 0xffffff
              }),
              new THREE.MeshStandardMaterial({ 
                map: textures.grassTop, 
                roughness: 0.85,
                metalness: 0,
                color: 0xffffff
              }),
              new THREE.MeshStandardMaterial({ 
                map: textures.dirt, 
                roughness: 0.95,
                metalness: 0,
                color: 0xffffff
              }),
              new THREE.MeshStandardMaterial({ 
                map: textures.grassSide, 
                roughness: 0.85,
                metalness: 0,
                color: 0xffffff
              }),
              new THREE.MeshStandardMaterial({ 
                map: textures.grassSide, 
                roughness: 0.85,
                metalness: 0,
                color: 0xffffff
              }),
            ]
          } else if (isStone) {
            // Stone deeper down
            const stoneMat = new THREE.MeshStandardMaterial({ 
              map: textures.stone, 
              roughness: 0.9,
              metalness: 0,
              color: 0xffffff
            })
            materials = [stoneMat, stoneMat, stoneMat, stoneMat, stoneMat, stoneMat]
          } else {
            // Dirt layers
            const dirtMat = new THREE.MeshStandardMaterial({ 
              map: textures.dirt, 
              roughness: 0.95,
              metalness: 0,
              color: 0xffffff
            })
            materials = [dirtMat, dirtMat, dirtMat, dirtMat, dirtMat, dirtMat]
          }
          
          const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize)
          const block = new THREE.Mesh(geometry, materials)
          block.position.set(x * blockSize, y * blockSize, z * blockSize)
          block.castShadow = true
          block.receiveShadow = true
          scene.add(block)
          blocks.push(block)
        }
      }
    }

    // ========== TALL GRASS ==========
    const grassBlades: THREE.Mesh[] = []
    const grassBladeMaterial = new THREE.MeshStandardMaterial({
      map: textures.tallGrass,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      roughness: 0.9
    })

    for (let x = -terrainSize; x <= terrainSize; x += 3) {
      for (let z = -terrainSize; z <= terrainSize; z += 3) {
        if (Math.random() > 0.5) continue // Don't place grass everywhere
        
        const height = getHeight(x, z)
        const offsetX = (Math.random() - 0.5) * 1.5
        const offsetZ = (Math.random() - 0.5) * 1.5
        
        const bladeGeom = new THREE.PlaneGeometry(0.8, 0.8)
        const blade = new THREE.Mesh(bladeGeom, grassBladeMaterial.clone())
        
        blade.position.set(
          x * blockSize + offsetX,
          height * blockSize + 1,
          z * blockSize + offsetZ
        )
        
        blade.rotation.y = Math.random() * Math.PI * 2
        blade.castShadow = true
        blade.userData.swayOffset = Math.random() * Math.PI * 2
        blade.userData.swaySpeed = 0.8 + Math.random() * 0.4
        scene.add(blade)
        grassBlades.push(blade)
      }
    }

    // ========== TREES ==========
    const trees: THREE.Group[] = []
    
    const createTree = (x: number, z: number) => {
      const treeGroup = new THREE.Group()
      const height = getHeight(x, z)
      
      // Trunk (4 blocks tall)
      for (let y = 0; y < 4; y++) {
        const trunkGeom = new THREE.BoxGeometry(blockSize * 0.5, blockSize, blockSize * 0.5)
        const trunkMaterials = [
          new THREE.MeshStandardMaterial({ 
            map: textures.oakLog, 
            roughness: 0.9,
            metalness: 0,
            color: 0xffffff
          }),
          new THREE.MeshStandardMaterial({ 
            map: textures.oakLog, 
            roughness: 0.9,
            metalness: 0,
            color: 0xffffff
          }),
          new THREE.MeshStandardMaterial({ 
            map: textures.oakLogTop, 
            roughness: 0.9,
            metalness: 0,
            color: 0xffffff
          }),
          new THREE.MeshStandardMaterial({ 
            map: textures.oakLogTop, 
            roughness: 0.9,
            metalness: 0,
            color: 0xffffff
          }),
          new THREE.MeshStandardMaterial({ 
            map: textures.oakLog, 
            roughness: 0.9,
            metalness: 0,
            color: 0xffffff
          }),
          new THREE.MeshStandardMaterial({ 
            map: textures.oakLog, 
            roughness: 0.9,
            metalness: 0,
            color: 0xffffff
          }),
        ]
        const trunk = new THREE.Mesh(trunkGeom, trunkMaterials)
        trunk.position.y = y * blockSize
        trunk.castShadow = true
        trunk.receiveShadow = true
        treeGroup.add(trunk)
      }
      
      // Leaves canopy (spherical shape)
      const leavesMat = new THREE.MeshStandardMaterial({
        map: textures.oakLeaves,
        transparent: true,
        alphaTest: 0.3,
        side: THREE.DoubleSide,
        roughness: 0.85,
        metalness: 0,
        color: 0xffffff
      })
      
      // Create leaf cluster
      const leafPositions = [
        // Bottom layer
        [0, 4, 0], [1, 4, 0], [-1, 4, 0], [0, 4, 1], [0, 4, -1],
        [1, 4, 1], [-1, 4, 1], [1, 4, -1], [-1, 4, -1],
        // Middle layer
        [0, 5, 0], [1, 5, 0], [-1, 5, 0], [0, 5, 1], [0, 5, -1],
        [1, 5, 1], [-1, 5, 1], [1, 5, -1], [-1, 5, -1],
        // Top layer
        [0, 6, 0], [1, 6, 0], [-1, 6, 0], [0, 6, 1], [0, 6, -1],
        // Very top
        [0, 7, 0]
      ]
      
      leafPositions.forEach(([lx, ly, lz]) => {
        const leafGeom = new THREE.BoxGeometry(blockSize * 0.9, blockSize * 0.9, blockSize * 0.9)
        const leaf = new THREE.Mesh(leafGeom, leavesMat.clone())
        leaf.position.set(lx * blockSize * 0.5, ly * blockSize * 0.5, lz * blockSize * 0.5)
        leaf.castShadow = true
        leaf.receiveShadow = true
        treeGroup.add(leaf)
      })
      
      treeGroup.position.set(x * blockSize, height * blockSize, z * blockSize)
      scene.add(treeGroup)
      return treeGroup
    }

    // Place trees strategically
    const treePositions = [
      [-15, -15], [-8, -18], [12, -12], [18, -8],
      [-18, 10], [-10, 15], [8, 18], [15, 12],
      [0, -20], [-20, 0], [20, 5], [5, 20]
    ]
    
    treePositions.forEach(([x, z]) => {
      trees.push(createTree(x, z))
    })

    // ========== CLOUDS (SIMPLIFIED) ==========
    const clouds: THREE.Group[] = []
    const cloudMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7
    })

    for (let i = 0; i < 8; i++) {  // Reduced from 20
      const cloudGroup = new THREE.Group()
      
      // Create simpler cloud shape
      for (let j = 0; j < 4; j++) {  // Reduced from 8
        const size = 3 + Math.random() * 2
        const cloudPart = new THREE.Mesh(
          new THREE.SphereGeometry(size, 6, 6),  // Reduced geometry detail
          cloudMaterial.clone()
        )
        cloudPart.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 8
        )
        cloudGroup.add(cloudPart)
      }
      
      cloudGroup.position.set(
        (Math.random() - 0.5) * 200,
        40 + Math.random() * 20,
        (Math.random() - 0.5) * 200
      )
      
      scene.add(cloudGroup)
      clouds.push(cloudGroup)
    }

    // ========== OPTIMIZED LIGHTING ==========
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    // Main sun light with reduced shadow quality for performance
    const sunLight = new THREE.DirectionalLight(0xfff8dc, 1.5)
    sunLight.position.set(50, 80, 40)
    sunLight.castShadow = true
    sunLight.shadow.camera.left = -60
    sunLight.shadow.camera.right = 60
    sunLight.shadow.camera.top = 60
    sunLight.shadow.camera.bottom = -60
    sunLight.shadow.mapSize.width = 1024  // Reduced for performance
    sunLight.shadow.mapSize.height = 1024
    sunLight.shadow.bias = -0.001
    scene.add(sunLight)

    // Hemisphere light
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x6b8e23, 0.5)
    scene.add(hemiLight)

    // ========== MOUSE INTERACTION ==========
    let lastMouseMove = Date.now()
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
      mouseRef.current.isMoving = true
      lastMouseMove = Date.now()
    }

    window.addEventListener('mousemove', handleMouseMove)

    // ========== ANIMATION LOOP ==========
    let time = 0
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      time += 0.01

      // Auto-rotate when mouse inactive
      const isIdle = Date.now() - lastMouseMove > 2000
      mouseRef.current.isMoving = !isIdle

      // Camera control
      const radius = 40
      const baseAngle = time * 0.1

      if (isIdle) {
        camera.position.x = Math.sin(baseAngle) * radius
        camera.position.z = Math.cos(baseAngle) * radius
        camera.position.y = 20 + Math.sin(time * 0.5) * 5
      } else {
        const targetX = Math.sin(baseAngle) * radius + mouseRef.current.x * 15
        const targetZ = Math.cos(baseAngle) * radius + mouseRef.current.y * 15
        const targetY = 20 - mouseRef.current.y * 10

        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.z += (targetZ - camera.position.z) * 0.05
        camera.position.y += (targetY - camera.position.y) * 0.05
      }

      camera.lookAt(0, 5, 0)

      // Animate grass
      grassBlades.forEach((blade) => {
        const swayOffset = blade.userData.swayOffset
        const swaySpeed = blade.userData.swaySpeed
        blade.rotation.z = Math.sin(time * swaySpeed + swayOffset) * 0.2
      })

      // Animate clouds
      clouds.forEach((cloud, i) => {
        cloud.position.x += 0.02
        if (cloud.position.x > 100) cloud.position.x = -100
        cloud.position.y += Math.sin(time + i) * 0.01
      })

      // Gentle tree sway
      trees.forEach((tree, i) => {
        tree.rotation.z = Math.sin(time + i) * 0.015
      })

      renderer.render(scene, camera)
    }

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
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      Object.values(textures).forEach(tex => tex.dispose())
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
