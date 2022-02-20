export default function navbar(state, action) {
    console.log(state)
    switch (action.type) {
        case 'ACTIVE':
            return (state.isCollapsed = false)
        case 'HIDE':
            return (state.isCollapsed = true)
        case 'TOGGLE':
            return (state.isCollapsed = action.payload)
        default:
            break
    }
}
