import { useState } from 'react'
import CounsellingIndex from './pages/Index'
import Counsellors from './pages/Counsellors'
import CounsellorProfile from './pages/CounsellorProfile'
import CounsellorDashboard from './pages/CounsellorDashboard'
import UserDashboard from './pages/UserDashboard'

const CounsellingRouter = () => {
    const [currentPage, setCurrentPage] = useState('index')
    const [selectedCounsellorId, setSelectedCounsellorId] = useState(null)

    const navigateTo = (page, counsellorId = null) => {
        setCurrentPage(page)
        if (counsellorId) {
            setSelectedCounsellorId(counsellorId)
        }
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'index':
                return <CounsellingIndex onNavigate={navigateTo} />
            case 'counsellors':
                return <Counsellors onNavigate={navigateTo} />
            case 'counsellor-profile':
                return <CounsellorProfile counsellorId={selectedCounsellorId} onNavigate={navigateTo} />
            case 'counsellor-dashboard':
                return <CounsellorDashboard onNavigate={navigateTo} />
            case 'user-dashboard':
                return <UserDashboard onNavigate={navigateTo} />
            default:
                return <CounsellingIndex onNavigate={navigateTo} />
        }
    }

    return renderPage()
}

export default CounsellingRouter
