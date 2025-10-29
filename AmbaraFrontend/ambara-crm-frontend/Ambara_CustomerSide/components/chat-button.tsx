"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <div className={cn(
        "fixed bottom-24 right-6 w-96 shadow-2xl transform transition-all duration-300 ease-out origin-bottom-right z-50",
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none"
      )}>
        <Card className="overflow-hidden border-2">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-semibold">Chat with us !</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hover:bg-primary/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4 text-primary-foreground" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] p-4 overflow-y-auto bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex flex-col gap-4">
              {/* Welcome Message */}
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">
                  👋 Hello! How can we help you today?
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  Support Team • Just now
                </span>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] ml-auto">
                <p className="text-sm">
                  Welcome to Ambara! We typically reply within a few minutes.
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  Bot • Just now
                </span>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-card">
            <form 
              onSubmit={(e) => {
                e.preventDefault()
                if (message.trim()) {
                  // Handle message sending here
                  setMessage("")
                }
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Chat Button with Animation */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-primary rounded-full animate-ping opacity-30" />
        <Button
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="rounded-full shadow-lg w-10 h-10 hover:scale-105 transition-transform relative z-50"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <span className="absolute left-0 -translate-x-full -translate-y-1/2 top-1/2 mr-2 px-2 py-1 bg-primary text-primary-foreground text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap -ml-2">
          Chat with us
        </span>
      </div>
    </div>
  )
}
