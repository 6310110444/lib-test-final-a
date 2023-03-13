import { Outlet } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
import DashboardLeft from './DashboardLeft'

const Dashboard = () => {
    useTitle('Library Management System')
    return (
        <section className='layout_dashboard'>
            <>
                <DashboardLeft />
                <div className="dashboard_container">
                    <Outlet />
                </div>
            </>
        </section>
    )
}
export default Dashboard