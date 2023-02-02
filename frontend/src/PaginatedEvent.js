import React from "react";
import Axios from 'axios';
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";

function PaginatedEvent() {

  let totalData = 0;
  
  const [limit, setLimit] = useState(5);

  const [currentPage, setcurrentPage] = useState(0);

  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  // fetches data for first page and sets pagination total pages
  useEffect(() => {
    fetch(`http://localhost:8000/api/events`)
   .then((response) => response.json())
   .then((responseJson) => {
    totalData = Number(responseJson.length)
    setTotal(Number(responseJson.length))
   })
   .catch((error) => {
     console.error(error);
   });

    const getEvents = async () => {
      const res = await fetch(
        `http://localhost:8000/api/events?page[number]=1&page[size]=${limit}`
      );
      const data = await res.json();   
      setpageCount(Math.ceil(totalData / limit));
      setItems(data);
    };
    getEvents();
  }, [limit]);

  // fetches event data for current pages
  const fetchEvents = async (Page) => {
      const res = await fetch(
        `http://localhost:8000/api/events?page[number]=${Page}&page[size]=${limit}`
      );
      const data = await res.json();
      return data;
  };

  // creates new evnt with post request method
  function goToCreateEvent (){
    navigate("/createvent", { state: { 
      text: {
        text1:'Create an Event! -', 
        text2: 'Create', 
        item: {id:0}}    
    } });
  }

  // edits selected event with put request method
  function goToEditEvent (eventItem){
    navigate("/editevent", { 
      state: { 
        text: {text1:'Edit an Event! -', text2: 'Edit', }, 
        item: eventItem      
      } });
  }

  // deletes selected event with delete request method
  function deleteEvent(item){
    Axios.delete(`http://127.0.0.1:8000/api/events/${item.id}/`)
    .then(alert("Event deleted!"))
    .catch(error => alert("Error occured while deleting selected event!\n" + error.response ))
  }

  // page number onclick funtion
  const handlePageClick = async (data) => {
    const s = data.selected + 1
    setcurrentPage(data.selected + 1)
    const eventsFormServer = await fetchEvents(s);
    setItems(eventsFormServer);
  };

  return (
    <div className="container m-4 card">
      <h5> Events</h5>
      <p> List of events! - 
        <span style={{ color: 'blue', cursor:"pointer"}} onClick={goToCreateEvent}> Create</span>
      </p>
      <div style={{display:"inline-block"}}>
        <h6 style={{display:"inline-block"}} >Show</h6>             
        <select  id="size" name="size" className=" m-2" onChange={(e)=> setLimit(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select> <h6 style={{display:"inline-block"}}>entries</h6>
      </div>
      <div>
        <div className="row m-2 card">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
              <th scope="col">Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              var utcDate = new Date(item.Date).toUTCString().replaceAll("GMT", "");
              return (
                <tr key={item.id}>
                  <td>{item.Name} </td>
                  <td>{item.Location}</td>
                  <td>{utcDate + " UTC "}</td>
                  <td style={{ color: 'blue',cursor:"pointer" }}>
                    <span onClick={() => goToEditEvent(item)}> Edit </span>
                    <span onClick={() => deleteEvent(item)}> Delete </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
      {/* <div style={{display:"inline-block"}}>Showing {currentPage * limit +1 } to {currentPage *limit +limit} of {total} results</div> */}
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}
  
export default PaginatedEvent;