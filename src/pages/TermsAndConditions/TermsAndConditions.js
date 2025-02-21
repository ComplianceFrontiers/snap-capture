import React,{useState} from "react";
import "./TermsAndConditions.css";
import {   FaArrowLeft } from "react-icons/fa";
import Privacy from "../PolicyAcknowledgement/PolicyAcknowledgement";
const TermsAndConditions = ({user}) => {
  const [goBack, setGoBack] = useState(false);
  if (goBack) {
    return <Privacy user={user}/>;
  }
  return (
    <div className="terms-wrapper">
<div className="back-button" onClick={() => setGoBack(true)} style={{ cursor: "pointer" }}>
        <FaArrowLeft className="back-icon" /> Back
      </div>
      <div className="terms-container">
        <h2>Facility Usage Policies for Bellevue Community Center</h2>
        <p>
          The <strong>BELLEVUE COMMUNITY CENTER (BCC)</strong> serves as a resource providing services to a broad
          community. One component of our service delivery is to offer meeting and activity space to groups or
          individuals. Nonprofit organizations, other groups, and individuals may request the use of the facility
          during or outside regular operating hours. Approval is contingent upon availability of space and a BCC
          employee to supervise during the requested time period. Groups or individuals using the facility will
          abide by the following policies:
        </p>

        <h3>Facility Usage Agreement</h3>
        <ul>
          <li>
            A Facility Usage Application/Agreement form must be completed in full and submitted with two checks
            (a $200.00 Security Deposit and down payment) 30 days prior to your event.
          </li>
        </ul>

        <h3>Security Deposit</h3>
        <ul>
          <li>
            The $200.00 Security Deposit is held by BCC to pay for any repairs should there be any damages.
            The Security Deposit will be returned to the renter within ten business days of the event.
          </li>
        </ul>

        <h3>Down Payment and Cancellation Policy</h3>
        <ul>
          <li>
            The down payment, equal to 50% of your total bill, secures the venue and is only refundable if you
            cancel seven or more days prior to the event.
          </li>
          <li>
            Applicants are responsible for full payment for all reserved time periods on the signed contract
            regardless of whether the group utilized the facility, unless BCC received seven days written
            notice of cancellation. Only half of the deposit will be refunded due to lost clientele.
          </li>
        </ul>

        <h3>Facility Rules</h3>
        <ul>
          <li>
            The Bellevue Community Center is a smoke-free facility, including bathrooms, hallways, and the parking lot.
            Attendees must be 500ft or more from BCC property to smoke.
          </li>
          <li>No illegal substances are permitted in the building or on the premises.</li>
          <li>
            Decorations or other materials may not be hung on walls. All other forms and types of decorations must
            be approved by the management. Decorations may be placed on tables and/or chairs.
          </li>
          <li>Outside food is allowed during events; however, the BCC kitchen is not available for usage during events.</li>
        </ul>

        <h3>Behavioral Expectations</h3>
        <ul>
          <li>
            The BCC reserves the right to ask anyone to leave the premises at any time due to inappropriate behavior.
            Each group is responsible for the behavior of its members while using BCC facilities. Fighting will not
            be tolerated at BCC. Violators will be escorted off the premises and will not be allowed back into the event.
          </li>
          <li>
            The BCC representative on duty reserves the right to terminate the event if deemed necessary.
            The renter will forfeit all fees and deposits in such cases.
          </li>
          <li>
            All renters must agree to abide by the "Noise and Disorderly Conduct" ordinances provided by the New
            Castle County Police Department.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TermsAndConditions;
