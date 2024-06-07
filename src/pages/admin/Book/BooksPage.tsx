import Container from "@/components/ui/container";
import { AdminContainer } from "@/container";
import Table from "@/container/admin/BookTable/Table";

const BooksPage = () => {

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
