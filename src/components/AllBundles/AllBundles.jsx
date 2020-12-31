import React, { useState, useEffect } from "react";
import { Table, Alert, Button } from "react-bootstrap";
import bundleDataService from "../Services/BundleDataService";

const AllBundles = (props) => {
  const [bundles, setBundles] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    bundleDataService
      .getAllBundles()
      .then((res) => {
        if (!res.data.error) {
          setBundles(res.data.response);
        }
      })
      .catch((res) => {
        if (res.response != undefined) {
          setAlert(
            <Alert variant="danger">{res.response.data.response}</Alert>
          );
        }
      });
  }, [alert]);

  const deleteBundle = (id) => {
    bundleDataService
      .deleteBundleById(id)
      .then((res) => {
        if (!res.data.error) {
          setAlert(
            <Alert variant="success">Bundle Deleted Successfully</Alert>
          );
        }
      })
      .catch((res) => {
        setAlert(<Alert variant="danger">{res.response.data.response}</Alert>);
      });
  };

  return (
    <div className="col-md-8 offset-md-2 card card-body mt-5">
      <h4>
        <strong>All Bundles</strong>
      </h4>
      {alert}
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Bundle Name</th>
            <th>Bundle Products</th>
            <th>Bundle Type</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bundles.map((bundle) => {
            return (
              <tr>
                <td>{bundle.bundleName}</td>
                <td>
                  {bundle.bundleProducts.map((bp) => {
                    return <h6>{bp.product.productName}</h6>;
                  })}
                </td>
                <td>{bundle.bundleType}</td>
                <td>
                  <Button variant="info">Update</Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteBundle(bundle.bundleId);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AllBundles;
