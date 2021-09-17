import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { Line, Bar } from "react-chartjs-2";

function HourlyModal({ hourlyTemp, hourlyRain }) {
  const [hourlyModal, setHourlyModal] = React.useState(false);

  let tempLabels = [];
  let tempDataItems = [];
  let tempData =[];
  if (hourlyTemp) {
    hourlyTemp.forEach((hour) => {
      tempLabels.push(
        new Date(hour.dt * 1000).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      tempDataItems.push(hour.temp);
    });
    tempData = {
      labels: tempLabels,
      datasets: [
        {
          label: "Hourly Temperature",
          data: tempDataItems,
          fill: true,
          backgroundColor: "rgb(25, 99, 82)",
          borderColor: "rgba(85, 199, 132, 0.2)",
        },
      ],
    };
  }
  
  let rainLabels = [];
  let rainDataItems = [];
  let rainData = [];
  if (hourlyRain) {
    hourlyRain.forEach((hour) => {
      rainLabels.push(
        new Date(hour.dt * 1000).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })
        );
        rainDataItems.push(hour.pop);
      });
      rainData = {
        labels: rainLabels,
        datasets: [
          {
            label: "Hourly Precipitation",
            data: rainDataItems,
            fill: true,
            backgroundColor: "rgb(256, 0, 0)",
            borderColor: "rgba(85, 199, 132, 0.2)",
          },
        ],
      };
    }
    // debugger
    return (
      <Modal
        data-cy="hourly-modal-container"
      onClose={() => setHourlyModal(false)}
      onOpen={() => setHourlyModal(true)}
      hourlyModal={hourlyModal}
      trigger={
        <Button attached="top" data-cy="view-button" color="olive" >
          Check Out Hourly Forecast
        </Button>
      }
      >
      <Modal.Content >
        <Modal.Description>
          <Header>Hourly Forecast</Header>
          <Line data-cy="temp-hourly-graph" height="300" width="700" data={tempData} />
          <Bar data-cy="rain-hourly-graph" height="300" width="700" data={rainData} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default HourlyModal;
