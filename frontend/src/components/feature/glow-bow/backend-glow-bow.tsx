import { FRONTEND_TECH_STACK } from "@/constant/frontend-tech"
import { GlowBoxList } from "@/components/feature/glow-bow/glow-box-list"

export function BackendGlowBow() {
    const TechStack = FRONTEND_TECH_STACK
    return <GlowBoxList techStack={TechStack}  />
}