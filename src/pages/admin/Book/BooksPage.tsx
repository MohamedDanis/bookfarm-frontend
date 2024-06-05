import React, { useState } from "react";
import Container from "@/components/ui/container";
import AuthLayout from "@/components/layout/AuthLayout";
import { AdminContainer } from "@/container";
import Table from "@/container/admin/BookTable/Table";

const BooksPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen:boolean) => {
    setOpen(newOpen);
  };
  return (
      <div className="">
        <Container className="p-6"> 
          <AdminContainer.AddBook />
          {/* <AdminContainer.BookTable/> */}
          <Table/>
        </Container>
      </div>
  );
};

export default BooksPage;
