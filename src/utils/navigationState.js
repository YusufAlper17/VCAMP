// Navigation state - tracks if we've done SPA navigation
// This is separate from the component so it can be shared and persists across route changes
// but resets on full page refresh

let hasNavigatedInSession = false

export const setNavigated = () => {
    hasNavigatedInSession = true
}

export const hasNavigated = () => {
    return hasNavigatedInSession
}

export const resetNavigation = () => {
    hasNavigatedInSession = false
}
