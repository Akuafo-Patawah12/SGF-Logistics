import { useState } from "react";
import { Card, Row, Col, Table, Collapse, Button } from "antd";
import styled from "styled-components";
import {Link} from "react-router-dom"

const { Panel } = Collapse;

const pricingData = [
  {
    key: "1",
    service: "Air Freight",
    weight: "0-5 kg",
    price: "$20/kg",
    delivery: "2-5 Days",
  },
  {
    key: "2",
    service: "Sea Freight",
    weight: "5-50 kg",
    price: "$5/kg",
    delivery: "10-20 Days",
  },
  {
    key: "3",
    service: "Door-to-Door",
    weight: "Any",
    price: "Custom Quote",
    delivery: "Varies",
  },
  {
    key: "4",
    service: "Free Procurement",
    weight: "Any",
    price: "No Extra Cost",
    delivery: "Varies",
  },
];

const columns = [
  { title: "Service", dataIndex: "service", key: "service" },
  { title: "Weight Range", dataIndex: "weight", key: "weight" },
  { title: "Price", dataIndex: "price", key: "price" },
  { title: "Delivery Time", dataIndex: "delivery", key: "delivery" },
];

const services = [
  {
    title: "Air Freight",
    description: "Fast & Reliable worldwide air shipping.",
    price: "From $20/kg",
  },
  {
    title: "Sea Freight",
    description: "Cost-effective large volume shipping.",
    price: "From $5/kg",
  },
  {
    title: "Door-to-Door",
    description: "Seamless shipping from seller to doorstep.",
    price: "Custom Quote",
  },
  {
    title: "Free Procurement",
    description: "We buy & ship items for you at no extra cost.",
    price: "No Extra Cost",
  },
];

const faqs = [
  {
    question: "How do I calculate my shipping cost?",
    answer: "Shipping cost depends on weight, volume, and destination. Contact us for an exact quote.",
  },
  {
    question: "How long does shipping take?",
    answer: "Air Freight takes 2-5 days, Sea Freight takes 10-20 days.",
  },
  {
    question: "Do you provide customs clearance?",
    answer: "Yes, we handle customs clearance for all shipments.",
  },
];

const PricingPage = () => {
  const [activeKey, setActiveKey] = useState(["1"]);

  return (
    <Container>
      <Header>
        <h1>Logistics Pricing</h1>
        <p>Competitive shipping rates for all logistics services.</p>
      </Header>

      {/* Service Pricing Cards */}
      <Row gutter={[16, 16]} justify="center">
        {services.map((service, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <StyledCard>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <h4>{service.price}</h4>
              <Link to={"/Contact"}><Button type="primary" style={{background:"#ddd",color:"#333"}}>Contact us</Button></Link>
            </StyledCard>
          </Col>
        ))}
      </Row>

      {/* Pricing Table */}
      <TableContainer>
        <h2>Shipping Rates</h2>
        <Table
          columns={columns}
          dataSource={pricingData}
          pagination={false}
          bordered
        />
      </TableContainer>

      {/* FAQ Section */}
      <FAQContainer>
        <h2>Frequently Asked Questions</h2>
        <Collapse activeKey={activeKey} onChange={setActiveKey} accordion>
          {faqs.map((faq, index) => (
            <Panel header={faq.question} key={index.toString()}>
              <p>{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </FAQContainer>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: #666;
  }
`;

const StyledCard = styled(Card)`
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  h3 {
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 14px;
  }
  
  h4 {
    margin: 10px 0;
    font-weight: bold;
    color: var(--purple);
  }
  
  button {
    margin-top: 10px;
  }
`;

const TableContainer = styled.div`
  margin: 40px 0;
  text-align: center;
  
  h2 {
    margin-bottom: 20px;
  }
`;

const FAQContainer = styled.div`
  margin: 40px 0;
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export default PricingPage;
