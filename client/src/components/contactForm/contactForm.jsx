/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SEND_EMAIL } from "../../utils/mutations";
import "./index.css";

const ContactForm = () => {
  const [contactMethod, setContactMethod] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setfullname] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [sendEmail] = useMutation(SEND_EMAIL);

  const handleContactMethodChange = (e) => {
    setContactMethod(e.target.value);
  };

  const handleSubmit = () => {
    console.log("contact method: " + contactMethod);

    const formData = {
      fullname,
      contactMethod,
      email: contactMethod === "email" ? email : phone,
      subject,
      message,
    };

    sendEmail({ variables: { input: formData } })
      .then((res) => {
        alert("Email sent successfully");
      })
      .catch((err) => {
        alert("Error sending email");
        console.error(err);
      });
  };

  return (
    <Form className="mx-auto, my-5 form text-center">
      <Form.Group controlId="fullname">
        <Form.Label className="my-3"> Name</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setfullname(e.target.value)}
          placeholder="John Smith"
        />
      </Form.Group>
      <Form.Group controlId="contactMethod">
        <Form.Label className="my-5">Contact Method</Form.Label>
        <Form.Control
          as="select"
          onChange={handleContactMethodChange}
          value={contactMethod}
        >
          <option value="email">Email</option>
          <option value="phone">Phone Number</option>
        </Form.Control>
      </Form.Group>
      {contactMethod === "email" && (
        <Form.Group controlId="email">
          <Form.Label className="my-5">Email</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="38927@example.com"
          />
        </Form.Group>
      )}
      {contactMethod === "phone" && (
        <Form.Group controlId="phone">
          <Form.Label className="my-5">Phone Number</Form.Label>
          <Form.Control
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="123-456-7890"
          />
        </Form.Group>
      )}
      <Form.Group controlId="subject">
        <Form.Label className="my-5">Subject</Form.Label>
        <Form.Control
          type="text"
          onChange={(e) => setSubject(e.target.value)}
          placeholder="sales, support, suggestions, etc."
        />
      </Form.Group>
      <Form.Group controlId="message">
        <Form.Label className="my-5">Message / Details</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="please provide more details, we'll be happy to help"
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit} className="my-5 w-100">
        Submit
      </Button>
    </Form>
  );
};

export default ContactForm;
