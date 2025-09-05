"use client"

import { useEffect, useRef } from "react"

interface AnimatedCardProps {
  recipientName: string
  senderName: string
  theme: string
  style: string
  inspirationalPhrase: string
  customMessage?: string
}

export default function AnimatedCard({
  recipientName,
  senderName,
  theme,
  style,
  inspirationalPhrase,
  customMessage,
}: AnimatedCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar canvas
    canvas.width = 800
    canvas.height = 600

    // Función de animación
    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fondo gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#1a1a1a")
      gradient.addColorStop(1, "#000000")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Efectos de partículas según el estilo
      if (style === "flores") {
        drawFloatingFlowers(ctx, frame)
      } else if (style === "corazones") {
        drawFloatingHearts(ctx, frame)
      } else if (style === "dorado") {
        drawGoldenParticles(ctx, frame)
      }

      // Texto principal
      drawAnimatedText(ctx, frame, recipientName, senderName, inspirationalPhrase, customMessage)

      frame++
      requestAnimationFrame(animate)
    }

    animate()
  }, [recipientName, senderName, style, inspirationalPhrase, customMessage])

  const drawFloatingFlowers = (ctx: CanvasRenderingContext2D, frame: number) => {
    const flowers = ["🌸", "🌺", "🌷", "🌹"]
    for (let i = 0; i < 10; i++) {
      const x = Math.sin(frame * 0.01 + i) * 100 + 400
      const y = Math.cos(frame * 0.008 + i) * 50 + 100 + i * 40
      ctx.font = "30px Arial"
      ctx.fillText(flowers[i % flowers.length], x, y)
    }
  }

  const drawFloatingHearts = (ctx: CanvasRenderingContext2D, frame: number) => {
    const hearts = ["💕", "💖", "💝", "💗"]
    for (let i = 0; i < 8; i++) {
      const x = Math.sin(frame * 0.012 + i) * 120 + 400
      const y = Math.cos(frame * 0.01 + i) * 60 + 150 + i * 50
      ctx.font = "25px Arial"
      ctx.fillText(hearts[i % hearts.length], x, y)
    }
  }

  const drawGoldenParticles = (ctx: CanvasRenderingContext2D, frame: number) => {
    for (let i = 0; i < 15; i++) {
      const x = Math.sin(frame * 0.015 + i) * 150 + 400
      const y = Math.cos(frame * 0.012 + i) * 80 + 200 + i * 30

      ctx.beginPath()
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fillStyle = `hsl(${45 + Math.sin(frame * 0.1 + i) * 20}, 100%, 70%)`
      ctx.fill()
    }
  }

  const drawAnimatedText = (
    ctx: CanvasRenderingContext2D,
    frame: number,
    recipient: string,
    sender: string,
    phrase: string,
    custom?: string,
  ) => {
    ctx.textAlign = "center"

    // Título
    if (frame > 30) {
      ctx.font = "bold 48px Arial"
      ctx.fillStyle = "#ffffff"
      ctx.fillText(`Para ${recipient} ❤️`, 400, 150)
    }

    // Frase inspiradora
    if (frame > 90) {
      ctx.font = "italic 24px Arial"
      ctx.fillStyle = "#ffb6c1"
      wrapText(ctx, `"${phrase}"`, 400, 250, 600, 30)
    }

    // Mensaje personalizado
    if (custom && frame > 150) {
      ctx.font = "20px Arial"
      ctx.fillStyle = "#ffffff"
      wrapText(ctx, custom, 400, 350, 600, 25)
    }

    // Firma
    if (frame > 210) {
      ctx.font = "18px Arial"
      ctx.fillStyle = "#ffd700"
      ctx.fillText(`Con cariño, ${sender} ✨`, 400, 450)
    }

    // Logo Serené
    if (frame > 270) {
      ctx.font = "bold 16px Arial"
      ctx.fillStyle = "#888888"
      ctx.fillText("Un detalle de Serené Le Parfum", 400, 500)
    }
  }

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) => {
    const words = text.split(" ")
    let line = ""
    let currentY = y

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY)
        line = words[n] + " "
        currentY += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, x, currentY)
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-auto border rounded-lg shadow-lg"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}
