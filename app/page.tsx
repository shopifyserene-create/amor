"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift } from "lucide-react"

export default function SereneDigitalGift() {
  const [step, setStep] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [formData, setFormData] = useState({
    recipientName: "",
    senderName: "",
    theme: "",
    style: "",
    inspirationalPhrase: "",
    customMessage: "",
  })

  const themes = [
    { value: "amor", label: "Amor ❤️", color: "from-red-500 to-pink-500" },
    { value: "amistad", label: "Amistad 💛", color: "from-yellow-400 to-orange-500" },
    { value: "romance", label: "Romance 💕", color: "from-pink-400 to-red-400" },
    { value: "gratitud", label: "Gratitud 🙏", color: "from-purple-400 to-blue-500" },
  ]

  const styles = [
    { value: "flores", label: "Flores delicadas 🌸", preview: "🌸✨🌺" },
    { value: "corazones", label: "Corazones flotantes 💕", preview: "💕💖💝" },
    { value: "dorado", label: "Elegante dorado ✨", preview: "✨🌟💫" },
    { value: "minimalista", label: "Minimalista 🤍", preview: "🤍🖤🤍" },
  ]

  const inspirationalPhrases = [
    "Los recuerdos más dulces siempre huelen a ti",
    "Cada fragancia cuenta una historia de amor",
    "Tu esencia es única, como tu perfume favorito",
    "Los mejores momentos siempre tienen el aroma perfecto",
    "Serené: donde cada gota es un abrazo al alma",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const generateAndDownloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 1000

    // Create gradient background based on theme
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    switch (formData.theme) {
      case "amor":
        gradient.addColorStop(0, "#1a1a1a")
        gradient.addColorStop(0.5, "#2d1b2d")
        gradient.addColorStop(1, "#1a1a1a")
        break
      case "amistad":
        gradient.addColorStop(0, "#1a1a1a")
        gradient.addColorStop(0.5, "#2d2a1b")
        gradient.addColorStop(1, "#1a1a1a")
        break
      case "romance":
        gradient.addColorStop(0, "#1a1a1a")
        gradient.addColorStop(0.5, "#2d1b26")
        gradient.addColorStop(1, "#1a1a1a")
        break
      default:
        gradient.addColorStop(0, "#1a1a1a")
        gradient.addColorStop(0.5, "#2a2a2a")
        gradient.addColorStop(1, "#1a1a1a")
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle SERENÉ branding at top
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
    ctx.font = "bold 32px Arial"
    ctx.textAlign = "center"
    ctx.fillText("SERENÉ", canvas.width / 2, 60)

    // Add decorative elements based on style
    ctx.fillStyle = "rgba(255, 182, 193, 0.3)"
    if (formData.style === "flores") {
      ctx.font = "40px Arial"
      ctx.fillText("🌸 🌺 🌸", canvas.width / 2, 120)
    } else if (formData.style === "corazones") {
      ctx.font = "40px Arial"
      ctx.fillText("💕 💖 💝", canvas.width / 2, 120)
    } else if (formData.style === "dorado") {
      ctx.font = "40px Arial"
      ctx.fillText("✨ 🌟 💫", canvas.width / 2, 120)
    }

    // Main content
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 48px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`Para ${formData.recipientName} ❤️`, canvas.width / 2, 250)

    // Inspirational phrase
    ctx.fillStyle = "#ffb6c1"
    ctx.font = "italic 28px Arial"
    const words = formData.inspirationalPhrase.split(" ")
    let line = ""
    let y = 350
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width
      if (testWidth > canvas.width - 100 && n > 0) {
        ctx.fillText(`"${line}"`, canvas.width / 2, y)
        line = words[n] + " "
        y += 40
      } else {
        line = testLine
      }
    }
    ctx.fillText(`"${line}"`, canvas.width / 2, y)

    // Custom message if exists
    if (formData.customMessage) {
      ctx.fillStyle = "#ffffff"
      ctx.font = "24px Arial"
      const messageWords = formData.customMessage.split(" ")
      let messageLine = ""
      let messageY = y + 80
      for (let n = 0; n < messageWords.length; n++) {
        const testLine = messageLine + messageWords[n] + " "
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width
        if (testWidth > canvas.width - 100 && n > 0) {
          ctx.fillText(messageLine, canvas.width / 2, messageY)
          messageLine = messageWords[n] + " "
          messageY += 35
        } else {
          messageLine = testLine
        }
      }
      ctx.fillText(messageLine, canvas.width / 2, messageY)
      y = messageY
    }

    // Sender name
    ctx.fillStyle = "#ffffff"
    ctx.font = "32px Arial"
    ctx.fillText(`Con cariño, ${formData.senderName} ✨`, canvas.width / 2, y + 100)

    // Subtle SERENÉ branding at bottom
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.font = "18px Arial"
    ctx.fillText("Un detalle de Serené Le Parfum", canvas.width / 2, canvas.height - 40)

    // Download the image
    const link = document.createElement("a")
    link.download = `dedicatoria-serene-${formData.recipientName.toLowerCase()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Header */}
      <div className="bg-red-600 bg-gradient-to-r from-red-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20pantalla%202025-09-15%20155658-ZSgFzuPkhD8rFl0xFLkJYUx4yD6AuP.png"
              alt="SERENÉ Logo"
              className="h-16 w-auto bg-white px-4 py-2 rounded-lg shadow-lg"
            />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Regalo Digital Exclusivo</h1>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">Dedicatoria Animada Interactiva</h2>
          <p className="text-white opacity-90">Crea una tarjeta digital única para acompañar tu regalo</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                  step >= 1 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                1
              </div>
              <span className="text-xs font-medium text-gray-600">Nombres</span>
            </div>
            <div className="text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                  step >= 2 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                2
              </div>
              <span className="text-xs font-medium text-gray-600">Remitente</span>
            </div>
            <div className="text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                  step >= 3 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                3
              </div>
              <span className="text-xs font-medium text-gray-600">Tema</span>
            </div>
            <div className="text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 ${
                  step >= 4 ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                4
              </div>
              <span className="text-xs font-medium text-gray-600">Mensaje</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Paso 1: ¿Para quién es la dedicatoria?</h3>
            <p className="text-gray-600 mb-4">Ingresa el nombre de la persona especial que recibirá esta dedicatoria</p>
            <Input
              placeholder="Nombre del destinatario"
              value={formData.recipientName}
              onChange={(e) => handleInputChange("recipientName", e.target.value)}
              className="mb-6 text-lg py-3"
            />
            <button
              onClick={nextStep}
              disabled={!formData.recipientName.trim()}
              className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
            >
              Continuar →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Paso 2: ¿Quién envía la dedicatoria?</h3>
            <p className="text-gray-600 mb-4">Ingresa tu nombre para personalizar el mensaje</p>
            <Input
              placeholder="Tu nombre"
              value={formData.senderName}
              onChange={(e) => handleInputChange("senderName", e.target.value)}
              className="mb-6 text-lg py-3"
            />
            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                ← Anterior
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.senderName.trim()}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Paso 3: Personaliza tu dedicatoria</h3>
            <p className="text-gray-600 mb-6">Elige el tema y estilo que mejor represente tu mensaje</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tema de la dedicatoria</label>
              <Select value={formData.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                <SelectTrigger className="w-full py-3">
                  <SelectValue placeholder="Selecciona un tema" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.value} value={theme.value}>
                      {theme.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Estilo visual</label>
              <Select value={formData.style} onValueChange={(value) => handleInputChange("style", value)}>
                <SelectTrigger className="w-full py-3">
                  <SelectValue placeholder="Selecciona un estilo" />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                ← Anterior
              </button>
              <button
                onClick={nextStep}
                disabled={!formData.theme || !formData.style}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Paso 4: Mensaje inspirador</h3>
            <p className="text-gray-600 mb-6">Elige una frase especial y añade tu toque personal</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Frase inspiradora</label>
              <Select
                value={formData.inspirationalPhrase}
                onValueChange={(value) => handleInputChange("inspirationalPhrase", value)}
              >
                <SelectTrigger className="w-full py-3">
                  <SelectValue placeholder="Selecciona una frase inspiradora" />
                </SelectTrigger>
                <SelectContent>
                  {inspirationalPhrases.map((phrase) => (
                    <SelectItem key={phrase} value={phrase}>
                      {phrase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje personalizado (opcional)</label>
              <Textarea
                placeholder="Escribe un mensaje personalizado que salga del corazón..."
                value={formData.customMessage}
                onChange={(e) => handleInputChange("customMessage", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevStep}
                className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                ← Anterior
              </button>
              <button
                onClick={generateAndDownloadImage}
                disabled={!formData.inspirationalPhrase}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
              >
                🎁 Crear y Descargar Dedicatoria
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
