import { FRONTEND_TECH_STACK } from "@/constant/frontend-tech"
import { GlowBoxList } from "./glow-box-list"

export function FrontendGlowBow() {
    const frontendTechStack = FRONTEND_TECH_STACK
    return <GlowBoxList techStack={frontendTechStack}  />
}