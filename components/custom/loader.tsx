import { Loader2 } from "lucide-react"

const Loader = () => {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Loading...</h2>
        </div>
      </div>
    )
}

export default Loader