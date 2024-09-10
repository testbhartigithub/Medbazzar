import { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { getData } from "../../services/FetchNodeServices";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import { postData } from "../../services/FetchNodeServices";
import { serverURL } from "../../services/FetchNodeServices";
export default function ShowOrder() {
  const [orderData, setOrderData] = useState([]);
  const [orderDetailsData, setOrderDetailsData] = useState([]);

  const [open, setOpen] = useState(false);

  const FetchAllOrders = async () => {
    var result = await getData("users/show_all_orders");
    if (result.status) {
      setOrderData(result.data);
    }
  };
  useEffect(function () {
    FetchAllOrders();
  }, []);

  const FetchOrderDetails = async (orderid) => {
    var result = await postData("users/show_orderdetails", {orderid: orderid,});
    if (result.status) {
      setOrderDetailsData(result.data);
    }
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    FetchOrderDetails(rowData.orderid);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ShowOrderDetails = () => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogContent>
          <MaterialTable
            title="Order Details List"
            columns={[
              { title: "Transaction_Id", field: "transactionid" },
              { title: "Order_Id", field: "orderid" },
              { title: "Productdetailid", field: "productdetailid" },
              { title: "Price", field: "price" },
              { title: "Offer_Price", field: "offerprice" },
              { title: "Product Name", field: "productsubname" },
              {
                title: "Picture",
                field: "picture",
                render: (rowData) => (
                  <>
                    <img
                      src={`${serverURL}/images/${rowData.picture}`}
                      style={{ width: 40, height: 40, borderRadius: 12 }}
                    />{" "}
                  </>
                ),
              },

              // { title: 'Quantity', field: 'qty' },
              // { title: 'Delivery_Status', field: 'deliverystatus' },
            ]}
            data={orderDetailsData}
            options={{
              paging: true,
              pageSize: 4, // make initial page size
              emptyRowsWhenPaging: false, // To avoid of having empty rows
              pageSizeOptions: [3, 5, 7, 10], // rows selection options
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  function ShowOrder() {
    return (
      <MaterialTable
        title="Order_List"
        columns={[
          { title: "ORDER_ID", field: "orderid" },
          { title: "ORDER_DATE", field: "orderdate" },
          { title: "USER_ID", field: "userid" },
          { title: "MOBILE_NO", field: "mobileno" },
          { title: "EMAIL_ID", field: "emailid" },
          { title: "PAYMENT_ID", field: "paymentid" },
          { title: "PAYMENT_STATUS", field: "paymentstatus" },
        ]}
        data={orderData}
        options={{
          paging: true,
          pageSize: 4, // make initial page size
          emptyRowsWhenPaging: false, // To avoid of having empty rows
          pageSizeOptions: [3, 5, 7, 10], // rows selection options
        }}
        actions={[
          {
            icon: "link",
            tooltip: "Show Orders",
            onClick: (e, rowData) => handleOpen(rowData),
          },
        ]}
      />
    );
  }

  return (
    <div>
      <div> {ShowOrder()}</div>
      {ShowOrderDetails()}
    </div>
  );
}
