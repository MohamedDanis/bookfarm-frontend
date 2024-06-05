import AdminLayout from '@/components/layout/Sidebar/AdminLayout'
import NotFoundPage from '@/pages/NotFoundPage'
import { BookDetailsPage, BookEditPage } from '@/pages/admin/Book'
import BooksPage from '@/pages/admin/Book/BooksPage'
import DashboardPage from '@/pages/admin/Dashboard/DashboardPage'
import GenrePage from '@/pages/admin/Genre/GenrePage'
import LoginPage from '@/pages/admin/Login/LoginPage'
import OrderPage from '@/pages/admin/Orders/OrderPage'
import UserDetailsPage from '@/pages/admin/User/UserDetailsPage'
import UserPage from '@/pages/admin/User/UserPage'


import { Route, Routes } from 'react-router-dom'

const Admin = () => {
  return (
    <Routes>
    <Route path='/' element={<AdminLayout/>}>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/users' element={<UserPage/>}/>
        <Route path='/users/:id' element={<UserDetailsPage/>}/>
        <Route path='/books' element={<BooksPage/>}/>
        <Route path='/books/:id' element={<BookDetailsPage/>}/>
        <Route path='/books/edit/:id' element={<BookEditPage/>}/>
        <Route path='/genre' element={<GenrePage/>}/>
        <Route path='/orders' element={<OrderPage/>}/>
    </Route>
     <Route path='/login' element={<LoginPage/>}/>
     <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Admin