import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen:  true,
    mobileMenuOpen: false,
    pageLoading:  false,
  },
  reducers: {
    toggleSidebar:    (state)          => { state.sidebarOpen    = !state.sidebarOpen },
    setSidebarOpen:   (state, action)  => { state.sidebarOpen    = action.payload },
    toggleMobileMenu: (state)          => { state.mobileMenuOpen = !state.mobileMenuOpen },
    setMobileMenu:    (state, action)  => { state.mobileMenuOpen = action.payload },
    setPageLoading:   (state, action)  => { state.pageLoading    = action.payload },
  },
})

export const { toggleSidebar, setSidebarOpen, toggleMobileMenu, setMobileMenu, setPageLoading } = uiSlice.actions
export default uiSlice.reducer