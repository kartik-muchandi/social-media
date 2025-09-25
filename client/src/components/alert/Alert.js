import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loading && <Loading />}

      {alert.error && (
        <Toast
          msg={{ 
            title: "Error", 
            body: alert.error // Make sure this contains the actual message
          }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: { error: '' } })}
          bgColor="bg-danger"
        />
      )}

      {alert.success && (
        <Toast
          msg={{ 
            title: "Success", 
            body: alert.success // Make sure this contains the actual message
          }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: { success: '' } })}
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Alert;
