import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
  datasets: [
    {
      label: "Medições de Dispositivos",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Meses'
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Medições'
      }
    }
  }
};

const chartExample2 = {
  data: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Dataset 2",
        data: [20, 45, 28, 80, 99, 43, 56],
        fill: false,
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
};

const chartExample3 = {
  data: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Dispositivos",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255,99,132,0.6)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
};

const chartExample4 = {
  data: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
    datasets: [
      {
        label: "Usuários",
        data: [10, 25, 19, 12, 37, 29, 40],
        fill: false,
        backgroundColor: "rgba(54,162,235,0.6)",
        borderColor: "rgba(54,162,235,1)",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  }
};

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Dispositivos</h5>
                    <CardTitle tag="h2">Medições</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={data} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Dispositivos</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" /> 250
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar data={chartExample3.data} options={chartExample3.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Usuários cadastrados</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 40
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartExample4.data} options={chartExample4.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
