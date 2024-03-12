import { useOverviewState } from "./OverviewConstants";
import StatusBars from "../OverviewCharts/StatusBars";
import BillingStatusBars from "../OverviewCharts/BillingStatusBars";
import LoadDetailsView from "./LoadDetailsView";
import TotalPricePerDriverChart from "../OverviewCharts/TotalPricePerDriverChart";
import { Tooltip } from "@mui/material";
import LinearWithValueLabel from "./LinearWithValueLabel";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  SearchSelect,
  SearchSelectItem,
  Grid,
  Button,
  Divider,
  DateRangePicker,
  SelectItem,
  Select,
  Card,
} from "@tremor/react";
import CustomPagination from "./CustomPagination";
import "./Overview.css";
const Google_Maps_Api_Key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
import { PencilIcon } from "@heroicons/react/24/solid";

const Overview: React.FC = () => {
  const {
    drivers,
    setDrivers,
    refreshKey,
    setRefreshKey,
    handleDocumentsUpdated,
    trucks,
    setTrucks,
    trailers,
    setTrailers,
    totalPrice,
    setTotalPrice,
    selectedStatus,
    setSelectedStatus,
    isStatusEditing,
    setIsStatusEditing,
    editingLoadIndex,
    setEditingLoadIndex,
    filteredLoads,
    setFilteredLoads,
    updateLoadDocuments,
    selectedDate,
    setSelectedDate,
    selectedLoadNumber,
    setSelectedLoadNumber,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    loadDetails,
    setLoadDetails,
    newLoad,
    setNewLoad,
    isLoading,
    loadingProgress,
    sortConfig,
    setSortConfig,
    searchTerm,
    setSearchTerm,
    handleSearchSelectChange,
    handleDateRangeChange,
    handleStatusClick,
    editableIndex,
    setEditableIndex,
    deletableIndex,
    setDeletableIndex,
    formMode,
    setFormMode,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    showForm,
    setShowForm,
    errors,
    setErrors,
    submitting,
    setSubmitting,
    handleDriverSelect,
    handleTruckSelect,
    handleTrailerSelect,
    handleDocumentSelectFile,
    addLoadDetail,
    deleteLoad,
    openDeleteDialog,
    closeDeleteDialog,
    updateLoad,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    resetForm,
    handleDeleteClick,
    handleFormSubmit,
    requestSort,
    calculateTotalPrice,
    inProgressCount,
    setInProgressCount,
    completedCount,
    setCompletedCount,
    toDoCount,
    setToDoCount,
    notInvoicedCount,
    setNotInvoicedCount,
    invoicedCount,
    setInvoicedCount,
    receivedPaymentCount,
    setReceivedPaymentCount,
    isMobileView,
    isOpen,
    setIsOpen,
    addDialog,
    updateDialog,
  } = useOverviewState();

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "To-Do":
        return "badge-primary bg-red-500";
      case "In Progress":
        return "badge-warning";
      case "Completed":
        return "badge-success";
      case "Not Invoiced":
        return "badge-primary bg-orange-500";
      case "Invoiced":
        return "badge-warning bg-cyan-500";
      case "Received Payment":
        return "badge-success bg-purple-500";
      default:
        return "badge-secondary";
    }
  };

  const filteredToDoCount = filteredLoads.filter(
    (load) => load.status === "To-Do"
  ).length;
  const filteredInProgressCount = filteredLoads.filter(
    (load) => load.status === "In Progress"
  ).length;
  const filteredCompletedCount = filteredLoads.filter(
    (load) => load.status === "Completed"
  ).length;

  const handleLoadNumberClick = (loadNumber: string) => {
    setSelectedLoadNumber(loadNumber);
  };

  const handleCloseDetailsView = () => {
    setSelectedLoadNumber(null);
  };

  const formatTimes = (timestamp: string | undefined): string => {
    if (!timestamp) return "";

    const options: Intl.DateTimeFormatOptions = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Date(timestamp).toLocaleString("en-US", options);
  };

  return (
    <div className="overview-container">
      {isLoading ? (
        <LinearWithValueLabel value={loadingProgress} />
      ) : (
        <div>
          <Grid
            numItems={isMobileView ? 1 : 2}
            numItemsMd={1}
            numItemsSm={1}
            numItemsLg={3}
            className="gap-4"
          >
            <StatusBars
              toDoCount={toDoCount}
              inProgressCount={inProgressCount}
              completedCount={completedCount}
              filteredToDoCount={filteredToDoCount}
              filteredInProgressCount={filteredInProgressCount}
              filteredCompletedCount={filteredCompletedCount}
              onStatusClick={handleStatusClick}
              onDateRangeChange={handleDateRangeChange}
            />
            <TotalPricePerDriverChart loadDetails={loadDetails} />
            <BillingStatusBars
              notInvoicedCount={notInvoicedCount}
              invoicedCount={invoicedCount}
              receivedPaymentCount={receivedPaymentCount}
              filteredNotInvoicedCount={
                filteredLoads.filter((load) => load.status === "Not Invoiced")
                  .length
              }
              filteredInvoicedCount={
                filteredLoads.filter((load) => load.status === "Invoiced")
                  .length
              }
              filteredReceivedPaymentCount={
                filteredLoads.filter(
                  (load) => load.status === "Received Payment"
                ).length
              }
              onStatusClick={handleStatusClick}
              onDateRangeChange={handleDateRangeChange}
            />
          </Grid>
          <></>

          <Grid
            numItems={isMobileView ? 1 : 2}
            numItemsLg={2}
            className={`gap-4 load-details-container mt-10 ${
              !selectedLoadNumber ? "hidden" : ""
            }`}
          >
            <Card className="mb-0 pt-3 pb-0 pl-0 pr-0">
              <div className="details-table">
                <div className="main-buttons mt-1 px-3 mb-3">
                  <DateRangePicker
                    className="main-search DateRangePicker mr-2 max-w-md"
                    onValueChange={handleDateRangeChange}
                  />
                  <SearchSelect
                    placeholder="Search Load..."
                    onValueChange={handleSearchSelectChange}
                    className="main-search mr-2"
                  >
                    {filteredLoads.map((load, idx) => (
                      <SearchSelectItem key={idx} value={load.loadNumber}>
                        {load.loadNumber}
                      </SearchSelectItem>
                    ))}
                  </SearchSelect>
                  <Button
                    className="main-button bg-[#779BFB] hover:bg-[#6686DC] dark:bg-[#6686DC] dark:hover:bg-[#779BFB] dark:!border-none"
                    onClick={() => setIsOpen(true)}
                  >
                    {formMode === "add" ? "Add Load" : "Update Load"}
                  </Button>{" "}
                </div>
                {formMode === "edit" && updateDialog}
                {formMode === "add" && addDialog}
                <Table className="">
                  <TableHead className="sticky-header">
                    <TableRow>
                      <th
                        className="sort dark:text-dark-tremor-content-strong dark:bg-gray-800"
                        onClick={() => requestSort("loadNumber")}
                      >
                        {" "}
                        Load{" "}
                        {sortConfig.key === "loadNumber" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Truck
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Trailer
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Driver
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Pick-up Date-Time
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Delivery Date-Time
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Pick-up Location
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Delivery Location
                      </th>
                      <th
                        className="sort dark:text-dark-tremor-content-strong dark:bg-gray-800"
                        onClick={() => requestSort("price")}
                      >
                        {" "}
                        Price{" "}
                        {sortConfig.key === "price" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800">
                        Loaded miles
                      </th>
                      <th
                        className="sort dark:text-dark-tremor-content-strong dark:bg-gray-800"
                        onClick={() => requestSort("status")}
                      >
                        {" "}
                        Status{" "}
                        {sortConfig.key === "status" &&
                        sortConfig.direction === "asc"
                          ? "▲"
                          : "▼"}
                      </th>
                      <th className="dark:text-dark-tremor-content-strong dark:bg-gray-800"></th>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLoads
                      .slice(startIndex, endIndex)
                      .map((load, index) => (
                        <TableRow
                          className="hover:bg-gray-100 dark:hover:bg-gray-800"
                          key={index}
                        >
                          <td className="centered-cell">
                            <Tooltip title="Show details">
                              <div
                                onClick={() =>
                                  handleLoadNumberClick(load.loadNumber)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {load.loadNumber}
                              </div>
                            </Tooltip>
                          </td>
                          <td className="centered-cell">
                            <div>{load.truckObject}</div>
                          </td>
                          <td className="centered-cell">
                            <div>{load.trailerObject}</div>
                          </td>
                          <td className="centered-cell">
                            <div>{load.driverObject}</div>
                          </td>
                          <td className="centered-cell">
                            <div>{formatTimes(load.pickupTime)}</div>
                          </td>
                          <td className="centered-cell">
                            <div>{formatTimes(load.deliveryTime)}</div>
                          </td>
                          <td className="centered-cell">
                            <div>{load.pickupLocation}</div>
                          </td>
                          <td className="centered-cell">
                            <div>{load.deliveryLocation}</div>
                          </td>
                          <td className="centered-cell">
                            <div>{`$${load.price}`}</div>
                          </td>
                          <td className="centered-cell">
                            <div>
                              {load.allMiles !== null && `${load.allMiles} mi`}
                            </div>
                          </td>
                          <td className="centered-cell">
                            <div className="col-span-full sm:col-span-3">
                              <div className="flex items-center space-x-2">
                                {isStatusEditing &&
                                editingLoadIndex === index ? (
                                  <Select
                                    className="status-font"
                                    id="status"
                                    value={load.status || ""}
                                    onValueChange={(selectedStatus) => {
                                      const updatedLoad = {
                                        ...load,
                                        status: selectedStatus,
                                      };

                                      setLoadDetails((prevLoadDetails) =>
                                        prevLoadDetails.filter(
                                          (prevLoad) =>
                                            prevLoad.loadNumber !==
                                            load.loadNumber
                                        )
                                      );

                                      setLoadDetails((prevLoadDetails) => [
                                        ...prevLoadDetails,
                                        updatedLoad,
                                      ]);

                                      updateLoad(updatedLoad)
                                        .then(() => {
                                          setIsStatusEditing(false);
                                          setEditingLoadIndex(null);
                                        })
                                        .catch((error) => {
                                          console.error(
                                            "Error updating load:",
                                            error
                                          );
                                        });
                                    }}
                                  >
                                    <SelectItem value="To-Do" />
                                    <SelectItem value="In Progress" />
                                    <SelectItem value="Completed" />
                                    <SelectItem value="Not Invoiced" />
                                    <SelectItem value="Invoiced" />
                                    <SelectItem value="Received Payment" />
                                  </Select>
                                ) : (
                                  <Tooltip title="Change Status" arrow>
                                    <span
                                      className={`status-font badge ${getBadgeClass(
                                        load.status
                                      )}`}
                                      onClick={() => {
                                        setIsStatusEditing(true);
                                        setEditingLoadIndex(index);
                                      }}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {load.status || "Add Status"}
                                    </span>
                                  </Tooltip>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="centered-cell">
                            {editableIndex === index ? (
                              <div className="flex items-center">
                                <PencilIcon
                                  scale={1}
                                  className="w-6 mr-2 ml-1 mb-1 cursor-pointer"
                                  onClick={() => handleSaveClick(index)}
                                />
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <PencilIcon
                                  className="w-6 mr-2 ml-1 mb-1 cursor-pointer"
                                  onClick={() => handleEditClick(index)}
                                />
                              </div>
                            )}
                          </td>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
              <Divider className="mb-0 mt-0" />
              <nav
                className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 p-3"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <label className="text-sm font-normal text-gray-500 dark:text-gray-400 bg-transparent mr-2">
                    Loads per page
                  </label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) =>
                      handleItemsPerPageChange(Number(e.target.value))
                    }
                    className="text-sm dark:text-white dark:bg-gray-800 dark:border-gray-400 bg-transparent border-b border-gray-500"
                  >
                    <option
                      value={10}
                      className=" dark:text-white bg-transparent text-gray-900"
                    >
                      10
                    </option>
                    <option
                      value={20}
                      className="dark:bg-gray-800 dark:text-white bg-transparent text-gray-900"
                    >
                      20
                    </option>
                    <option
                      value={50}
                      className="dark:bg-gray-800 dark:text-white bg-transparent text-gray-900"
                    >
                      50
                    </option>
                  </select>
                  <span className="mx-1 font-semibold text-gray-900 dark:text-white">
                    {startIndex + 1}-{Math.min(endIndex, filteredLoads.length)}
                  </span>
                  of
                  <span className="mx-1 font-semibold text-gray-900 dark:text-white">
                    {filteredLoads.length}
                  </span>
                </span>
                {/* <Pagination>
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          </Pagination> */}
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </nav>
            </Card>
            <div
              className="load-table"
              style={{
                display: selectedLoadNumber ? "block" : "none",
                width: "37%",
              }}
            >
              {selectedLoadNumber && (
                <LoadDetailsView
                  key={refreshKey}
                  load={
                    loadDetails.find(
                      (load) => load.loadNumber === selectedLoadNumber
                    ) || null
                  }
                  onClose={handleCloseDetailsView}
                  updateLoadDocuments={updateLoadDocuments}
                />
              )}
            </div>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Overview;
