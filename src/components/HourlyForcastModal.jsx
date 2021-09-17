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
      onClose={() => setHourlyModal(false)}
      onOpen={() => setHourlyModal(true)}
      hourlyModal={hourlyModal}
      trigger={
        <Button attached="right" className="modal-button" color="olive" size="large">
          Check Out Hourly Forcast
        </Button>
      }
      >
      <Modal.Content>
        <Modal.Description>
          <Header>Hourly Forcast</Header>
          <Line height="400" width="800" data={tempData} />
          <Bar height="400" width="800" data={rainData} />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default HourlyModal;
