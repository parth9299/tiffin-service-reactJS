import React, { useEffect, useRef, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function CommonPagination({
    dataPerPage,
    totalData,
    currentPage,
    direction,
    setDataPerPage,
    setPaginationData,
    setCurrentPage,
    ...args
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

    // Calculate total number of pages
    const totalPages = Math.ceil(totalData / dataPerPage);

    // Calculate page numbers to display
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Define range for pagination
    let start = 1;
    let end = pageNumbers.length;
    if (currentPage - 2 > 1) {
        start = currentPage - 2;
    }
    if (currentPage + 2 < pageNumbers.length) {
        end = currentPage + 2;
    }

    // Paginate function to set current page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle changes in data per page
    const handleDataPerPageChange = (event) => {
        setCurrentPage(1)
        setDataPerPage(Number(event));
    };

    // Track previous value of dataPerPage to reset the page when it's changed
    const prevDataPerPage = useRef(dataPerPage);

    useEffect(() => {
        if (dataPerPage !== prevDataPerPage.current) {
            setCurrentPage(1); // Reset to first page if dataPerPage changes
        }
    }, [dataPerPage]);

    return (
        <div className="table-pagination mt-3">
            <div className="record-perpage">
                {/* Dropdown for selecting number of records per page */}
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction={direction || "down"}>
                    <DropdownToggle caret>{dataPerPage}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleDataPerPageChange(10)}>10</DropdownItem>
                        <DropdownItem onClick={() => handleDataPerPageChange(25)}>25</DropdownItem>
                        <DropdownItem onClick={() => handleDataPerPageChange(50)}>50</DropdownItem>
                        <DropdownItem onClick={() => handleDataPerPageChange(100)}>100</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <span className="total_records">{totalData} Records</span>
            </div>
            <Pagination>
                {/* First and Previous buttons */}
                <PaginationItem>
                    <PaginationLink first onClick={() => paginate(1)} disabled={currentPage === 1}
                    />
                </PaginationItem>
                <PaginationItem previous onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} s>
                    <PaginationLink
                        href="#"
                        previous
                    />
                </PaginationItem>
                {/* Show ellipsis if there are pages before the range */}
                {start !== 1 && <PaginationItem disabled><PaginationLink><span>...</span></PaginationLink> </PaginationItem>}

                {/* Render page numbers dynamically */}
                {pageNumbers.slice(start - 1, end).map((number) => (
                    <PaginationItem key={number} onClick={() => paginate(number)} active={currentPage === number}>
                        <PaginationLink> {number}</PaginationLink>
                    </PaginationItem>
                ))}

                {/* Show ellipsis if there are pages after the range */}
                {end !== pageNumbers.length && <PaginationItem disabled><PaginationLink><span>...</span></PaginationLink> </PaginationItem>}

                {/* Next and Last buttons */}
                <PaginationItem  >
                    <PaginationLink next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                </PaginationItem>
                <PaginationItem  >
                    <PaginationLink last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                </PaginationItem>
            </Pagination>
        </div>
    );
}
