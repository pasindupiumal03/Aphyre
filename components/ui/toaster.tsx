"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, open, onOpenChange, ...props }) => (
        <Toast key={id} open={open} onOpenChange={onOpenChange} {...props} className="p-6">
          <div className="grid gap-2 flex-1">
            {title && <ToastTitle className="text-base font-bold">{title}</ToastTitle>}
            {description && <ToastDescription className="text-sm text-muted-foreground leading-relaxed">{description}</ToastDescription>}
          </div>
          {action && <div className="ml-4">{action}</div>}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
