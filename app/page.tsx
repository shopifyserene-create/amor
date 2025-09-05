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
      <div className="bg-red-600 bg-gradient-to-r from-red-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold text-white">SERENÉ</h1>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-white">Dedicatoria Animada Interactiva</h2>
          <p className="text-white opacity-90">Crea una tarjeta digital única para acompañar tu regalo</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= num ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(step / 4) * 100}%` }} />
          </div>
        </div>

        {/* Steps */}
        {step === 1 && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Paso 1: Nombre de esa persona especial</h3>
            <Input
              placeholder="Nombre del destinatario"
              value={formData.recipientName}
              onChange={(e) => handleInputChange("recipientName", e.target.value)}
              className="mb-4"
            />
            <button
              onClick={nextStep}
              disabled={!formData.recipientName.trim()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Paso 2: Con mucho cariño,</h3>
            <Input
              placeholder="Tu nombre"
              value={formData.senderName}
              onChange={(e) => handleInputChange("senderName", e.target.value)}
              className="mb-4"
            />
            <button onClick={prevStep} className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg mr-4">
              Anterior
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.senderName.trim()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Paso 3: Tema y Estilo</h3>
            <div className="mb-4">
              <Select value={formData.theme} onValueChange={(value) => handleInputChange("theme", value)}>
                <SelectTrigger className="w-full">
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
            <div className="mb-4">
              <Select value={formData.style} onValueChange={(value) => handleInputChange("style", value)}>
                <SelectTrigger className="w-full">
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
            <button onClick={prevStep} className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg mr-4">
              Anterior
            </button>
            <button
              onClick={nextStep}
              disabled={!formData.theme || !formData.style}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Continuar
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-2xl font-bold mb-4">Paso 4: Mensaje Inspirador</h3>
            <Select
              value={formData.inspirationalPhrase}
              onValueChange={(value) => handleInputChange("inspirationalPhrase", value)}
            >
              <SelectTrigger className="w-full mb-4">
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
            <Textarea
              placeholder="Escribe un mensaje personalizado (opcional)"
              value={formData.customMessage}
              onChange={(e) => handleInputChange("customMessage", e.target.value)}
              className="mb-4"
            />
            <button onClick={prevStep} className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg mr-4">
              Anterior
            </button>
            <button
              onClick={generateAndDownloadImage}
              disabled={!formData.inspirationalPhrase}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
            >
              Generar y Descargar Imagen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
