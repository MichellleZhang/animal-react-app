import React from "react";
import './contactInfo.css';

function ContactPage() {
    return (
        <div className="row container">
            <h1>Contact Us</h1>
            <div className="col col-4">
                <ul>
                    <li> <h4>About Account Information</h4>
                        <span>PetSOS IT Teams</span><br />
                        <span>1.886.243.311</span><br />
                        <span>InformatioTeachnology@petsos.com</span> <br />
                        <span>123 Pet Avenue</span> <br />
                        <span>New York, NY 10128</span> <br />
                    </li>

                    <li> <h4>About Privacy Policy</h4>
                        <span>PetSOS Privacy Teams</span><br />
                        <span>1.886.233.416</span><br />
                        <span>Privacy@petsos.com</span> <br />
                        <span>123 Pet Avenue</span> <br />
                        <span>New York, NY 10128</span> <br />
                    </li>

                    <li> <h4>About Services Policy</h4>
                        <span>PetSOS Services Teams</span><br />
                        <span>1.886.233.479</span><br />
                        <span>Services@petsos.com</span> <br />
                        <span>123 Pet Avenue</span> <br />
                        <span>New York, NY 10128</span> <br />
                    </li>

                    <li> <h4>Others</h4>
                        <span>PetSOS Customer Services</span><br />
                        <span>1.886.666.888</span><br />
                        <span>CustomerService@petsos.com</span> <br />
                        <span>123 Pet Avenue</span> <br />
                        <span>New York, NY 10128</span> <br />
                    </li>
                </ul>
            </div>
            <div className="col">
                <img alt="lovelyPets" src="/img/petsHuman.jpeg" />
            </div>
        </div>
    )
}
export default ContactPage;
