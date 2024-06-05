import React from 'react'
import AuthLayout from '@/components/layout/AuthLayout'
import Container from '@/components/ui/container'
import { AdminContainer } from '@/container'
import Table from '@/components/general/data-table/Table'


const UserPage = () => {
  return (
    <div>
       <Container className='p-6'>
        <AdminContainer.AddUser/>
        <Table/>
        {/* <AdminContainer.UserTable/> */}
       </Container>
    </div>
  )
}
export default UserPage