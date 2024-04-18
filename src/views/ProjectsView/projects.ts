import ballCascadeScriptWrapper from './p5Projects/BallCascade'
import type { p5ScriptWrapper } from '@/types'

interface projectsType {
    title: string
    scriptID: string
    description: string
    scriptWrapper: p5ScriptWrapper
    isMobileOrTabletFriendly: boolean
}

const projects: projectsType[] = [
    {
        title: 'Ball Cascade',
        scriptID: 'ball-cascade',
        description: 'Not much to do here. You can flip gravity by clicking',
        scriptWrapper: ballCascadeScriptWrapper,
        isMobileOrTabletFriendly: true
    }
]

export default projects
