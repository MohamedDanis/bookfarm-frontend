import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import { FilterComp, StarRating } from "@/container/user";
import {  useState } from "react";
import { getAllBooks } from "@/api/admin/userRequests";
import axios from "axios";
import useSWR from "swr";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./store.module.css";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { latestBooks } from "@/api/admin/BookRequests";
import Marquee from "react-fast-marquee";
import jk from '@/assets/imgs/jk.jpeg'
import pc from '@/assets/imgs/pc.jpeg'
import sk from '@/assets/imgs/sk.jpeg'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";


const fetcher = () => {
    return axios
      .get(
        "https://api.quotable.io/quotes?tags=inspirational,famous-quotes&maxLength=100"
      )
      .then((res) => res.data)
      .catch((error) => console.error("Request failed:", error));
  };
 
const StorePage = () => {
  const cart = useSelector((state: any) => state.carts.products);
  function commonId() {
    const productIds = cart.map((item: any) => item.productId._id);
    const commonIds = productIds.filter((id: any) => {
      return data?.some((book: any) => book._id === id);
    });
    return commonIds;
  }
  const { data: quotesData } = useSWR(
    "/api/quotes",
    fetcher
  );

  async function fetchProducts(filters:any) {
    console.log(filters);
    // const res = await userApi.get('/books',{params:filters})
    // setProducts(res?.data)
    // console.log(res.data);
  }
  const { data, isLoading } = useSWR(
    "api/user/books",
    getAllBooks
  );
  const { data: ltbooksData } = useSWR(
    "/api/user/latest/books",latestBooks
  );
  
  const [showSort, setShowSort] = useState<string>('');
  const commonIds = commonId();

  if (isLoading) return <>Loading</>;
  return (
    <div>
      <Container className="">
        <div className="mx-auto w-full">
          <h1 className="text-2xl mb-4 text-[#006A10] font-bold">
            TOP AUTHORS
          </h1>
          <div className="flex gap-4 overflow-scroll md:overflow-hidden">
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={jk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">JK. Rowling</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={pc} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">Paulo Coelo</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={sk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">ShakeSpeare</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={jk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">JK. Rowling</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={pc} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">Paulo Coelo</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={sk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">ShakeSpeare</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={jk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">JK. Rowling</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={pc} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">Paulo Coelo</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={sk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">ShakeSpeare</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={sk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">ShakeSpeare</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={jk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">JK. Rowling</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={pc} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">Paulo Coelo</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={sk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">ShakeSpeare</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={jk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">JK. Rowling</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={pc} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">Paulo Coelo</h1>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={sk} alt="@shadcn" />
                <AvatarFallback>hi</AvatarFallback>
              </Avatar>
              <h1 className="text-xs">ShakeSpeare</h1>
            </div>
          </div>
          <div className="my-6 flex gap-4 items-center flex-wrap md:flex-nowrap">
            <div className="md:w-4/12 w-full bg-[#634532] h-40 rounded-xl p-5">
            <h1 className="text-xl font-medium text-white ">Today's Quotes</h1>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
              >
                {quotesData? quotesData?.results
                  ?.slice(0, 5)
                  .map((item: any, index: any) => (
                    <SwiperSlide
                      key={index}
                      className="text-white flex flex-col"
                    >
                      <div className="flex flex-col justify-between items-center mt-4">
                        <h2 className="text-base">" {item?.content} "</h2>
                        <h2 className="self-end mt-2">- {item?.author}</h2>
                      </div>
                    </SwiperSlide>
                  )):(
                    <Skeleton className="w-full rounded-xl h-6"/>
                  )}
              </Swiper>
            </div>
            <div className="md:w-8/12 w-full border border-[#634532] h-40 flex  rounded-xl relative items-center">
              <h1
                className=" uppercase font-semibold  tracking-wide rotate-180 bg-[#634532] text-white h-full py-5 rounded-r-xl px-2"
                style={{ writingMode: "vertical-lr" }}
              >
                New Arrivals
              </h1>
              <div className="flex flex-row items-center gap-4 w-full h-full overflow-x-auto md:overflow-hidden flex-1">
                <Marquee
                  className="flex  w-full "
                  pauseOnHover={true}
                  autoFill={true}
                >
                  {ltbooksData?.map((book: any, index: any) => (
                    <img
                      key={index}
                      src={book?.coverimage}
                      className="w-[83px] h-[134px] mr-4"
                      height={134}
                      width={83}
                      alt="coverimage"
                    />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
          <div>
            <div className="my-4 flex justify-between">
              <div className="">
                <h1 className="text-2xl font-semibold">Good Morning</h1>
                <h2 className="text-xl font-normal">Recommended For You</h2>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort By : {showSort}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sorting</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={showSort === 'LowToHigh'}
                    onCheckedChange={() => setShowSort('LowToHigh')}
                  >
                    Sort Price : Low to High
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showSort === 'HighToLow'}
                    onCheckedChange={() => setShowSort('HighToLow')}
                  >
                    Sort Price : High to Low
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showSort === 'Latest'}
                    onCheckedChange={() => setShowSort('Latest')}
                  >
                    Sort By Latest
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={showSort === 'Rating'}
                    onCheckedChange={() => setShowSort('Rating')}
                  >
                    Sort By Rating
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap-reverse md:flex-nowrap">
              <FilterComp onChange={fetchProducts} />
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-4 w-fit">
                {data?.map((book: any, index: any) => (
                  <div
                    key={index}
                    className="relative h-[420px] transition-all duration-300 ease-in-out p-4 flex flex-col items-center  rounded-xl gap-y-2"
                  >
                    <Link to={`/store/${book?._id}`} className="group w-[175px] h-[250px] relative">
                      <div className={`${styles.imagecontainer} hover:bg-slate-800 `}>
                        <img
                          src={book?.coverimage}
                          width={175}
                          height={250}
                          alt="coverimage"
                        />
                      </div>
                      <div className="absolute top-0 w-full h-full hover:bg-[#634532]/50 transition-colors grid place-items-center">
                      <Button
                        variant="greenery"
                        className="hidden group-hover:flex gap-2 group-hover:transition-all group-hover:duration-1000 duration-100 ease-in-out disabled:bg-slate-950 disabled:cursor-not-allowed"
                        disabled={commonIds.includes(book?._id)}
                      >
                        {commonIds.includes(book?._id) ? (
                          "ADDED"
                        ) : (
                          <>
                            <span>Add to Cart</span> <ShoppingBag />
                          </>
                        )}
                      </Button>
                      </div>
                    </Link>
                    <div className="transition-all">
                      
                      <h1 className=" font-medium">
                        {book?.title}
                      </h1>
                      <h2 className=" duration-100 ease-in-out font-light">
                        {book?.author}
                      </h2>
                    </div>
                    <StarRating rating={3} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default StorePage