"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown, Library, PlusCircle, Search, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  DialogFooter,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "../ui/use-toast"
// import { useToast } from "@/hooks/use-toast"

// Sample book data with cover images
export const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 7,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 8,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 9,
    title: "Animal Farm",
    author: "George Orwell",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
  {
    id: 10,
    title: "Brave New World",
    author: "Aldous Huxley",
    coverUrl: "/placeholder.svg?height=80&width=60&text=📚",
  },
]

type BorrowedBook = {
  id: number
  title: string
  author: string
  coverUrl: string
  borrowedDate: Date
}

export function BookBorrowingForm() {
  const [open, setOpen] = useState(false)
  const [bookSearchOpen, setBookSearchOpen] = useState(false)
  const [dateOpen, setDateOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<(typeof books)[0] | null>(null)
  const [borrowedDate, setBorrowedDate] = useState<Date | undefined>(new Date())
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
  const { toast } = useToast()
  console.log(open);
  
  const handleAddBook = () => {
    if (selectedBook && borrowedDate) {
      // Check if book is already in the list
      const isBookAlreadyAdded = borrowedBooks.some((book) => book.id === selectedBook.id)

      if (isBookAlreadyAdded) {
        toast({
          title: "Book already added",
          description: `"${selectedBook.title}" is already in your borrowing list.`,
          variant: "destructive",
        })
        return
      }

      setBorrowedBooks([
        ...borrowedBooks,
        {
          id: selectedBook.id,
          title: selectedBook.title,
          author: selectedBook.author,
          coverUrl: selectedBook.coverUrl,
          borrowedDate: borrowedDate,
        },
      ])

      toast({
        title: "Book added",
        description: `"${selectedBook.title}" has been added to your borrowing list.`,
      })

      setSelectedBook(null)
      setBorrowedDate(new Date())
    }
  }

  const handleRemoveBook = (id: number, title: string) => {
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== id))
    toast({
      title: "Book removed",
      description: `"${title}" has been removed from your borrowing list.`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Borrowed books:", borrowedBooks)
    // Here you would typically send the data to your backend
    toast({
      title: "Success!",
      description: `You've successfully borrowed ${borrowedBooks.length} book${borrowedBooks.length !== 1 ? "s" : ""}.`,
      variant: "default",
    })
    setBorrowedBooks([])
    setOpen(false)
  }

  return (
    <TooltipProvider>
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="gap-2">
            <Library className="w-5 h-5" />
            Borrow Books
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Borrow Books</DialogTitle>
            <DialogDescription className="pt-2 text-base">
              Search for books and add them to your borrowing list with their borrowed dates.
            </DialogDescription>
          </DialogHeader> */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
                    <div className="space-y-2">
                      <label htmlFor="book" className="text-sm font-medium leading-none">
                        Find a book
                      </label>
                      <Popover open={bookSearchOpen} onOpenChange={setBookSearchOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={bookSearchOpen}
                            className="justify-between w-full"
                            data-testid="book-search"
                          >
                            {selectedBook ? (
                              <div className="flex gap-2 items-center">
                                <img
                                  src={selectedBook.coverUrl || "/placeholder.svg"}
                                  alt=""
                                  className="object-cover w-5 h-6 rounded-sm"
                                />
                                <span className="truncate">{selectedBook.title}</span>
                              </div>
                            ) : (
                              "Search by title or author..."
                            )}
                            <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search books..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>
                                <div className="py-6 text-sm text-center">
                                  <Search className="mx-auto mb-2 w-10 h-10 text-muted-foreground" />
                                  No books found. Try a different search.
                                </div>
                              </CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-[300px]">
                                  {books.map((book) => (
                                    <CommandItem
                                      key={book.id}
                                      value={`${book.title} ${book.author}`}
                                      onSelect={() => {
                                        setSelectedBook(book)
                                        setBookSearchOpen(false)
                                      }}
                                      className="py-2"
                                    >
                                      <div className="flex gap-3 items-center">
                                        <img
                                          src={book.coverUrl || "/placeholder.svg"}
                                          alt=""
                                          className="object-cover w-8 h-10 rounded-sm"
                                        />
                                        <div className="overflow-hidden flex-1">
                                          <p className="font-medium truncate">{book.title}</p>
                                          <p className="text-xs truncate text-muted-foreground">{book.author}</p>
                                        </div>
                                        {selectedBook?.id === book.id && (
                                          <Check className="w-4 h-4 text-primary shrink-0" />
                                        )}
                                      </div>
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium leading-none">
                        Borrow date
                      </label>
                      <Popover open={dateOpen} onOpenChange={setDateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[180px] justify-start text-left font-normal",
                              !borrowedDate && "text-muted-foreground",
                            )}
                            data-testid="date-picker"
                          >
                            <CalendarIcon className="mr-2 w-4 h-4" />
                            {borrowedDate ? format(borrowedDate, "MMM d, yyyy") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto" align="end">
                          <Calendar
                            mode="single"
                            selected={borrowedDate}
                            onSelect={(date) => {
                              setBorrowedDate(date)
                              setDateOpen(false)
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="w-full"
                          onClick={handleAddBook}
                          disabled={!selectedBook || !borrowedDate}
                        >
                          <PlusCircle className="mr-2 w-4 h-4" />
                          Add to Borrowing List
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {!selectedBook
                        ? "Please select a book first"
                        : !borrowedDate
                          ? "Please select a date"
                          : "Add this book to your borrowing list"}
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your borrowing list</h3>
                <Badge variant="outline">
                  {borrowedBooks.length} {borrowedBooks.length === 1 ? "book" : "books"}
                </Badge>
              </div>

              {borrowedBooks.length === 0 ? (
                <div className="p-6 text-center rounded-lg bg-muted/50">
                  <Library className="mx-auto mb-3 w-12 h-12 text-muted-foreground" />
                  <p className="text-muted-foreground">Your borrowing list is empty</p>
                  <p className="mt-1 text-xs text-muted-foreground">Search for books above and add them to your list</p>
                </div>
              ) : (
                <ScrollArea className="h-[250px] rounded-md border">
                  <div className="p-4 space-y-3">
                    {borrowedBooks.map((book) => (
                      <div
                        key={`${book.id}-${book.borrowedDate.toISOString()}`}
                        className="flex gap-3 items-center p-3 rounded-md border bg-card"
                      >
                        <img
                          src={book.coverUrl || "/placeholder.svg"}
                          alt=""
                          className="object-cover w-12 h-16 rounded-sm"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{book.title}</p>
                          <p className="text-sm truncate text-muted-foreground">{book.author}</p>
                          <Badge variant="secondary" className="mt-1">
                            {format(book.borrowedDate, "MMM d, yyyy")}
                          </Badge>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleRemoveBook(book.id, book.title)}
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="sr-only">Remove {book.title}</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">Remove from list</TooltipContent>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={borrowedBooks.length === 0} className="gap-2">
                <Check className="w-4 h-4" />
                Complete Borrowing
              </Button>
            </DialogFooter>
          </form>
        {/* </DialogContent>
      </Dialog> */}
    </TooltipProvider>
  )
}
