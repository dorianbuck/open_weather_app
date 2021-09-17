import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { Line, Bar } from "react-chartjs-2";

function DailyModal({ dailyTemp, dailyRain }) {
  const [dailyModal, setdailyModal] = React.useState(false);

  let tempLabels = [];
  let tempDataItems = [];
  let tempData = [];
  if (dailyTemp) {
    dailyTemp.forEach((daily) => {
      tempLabels.push(new Date(daily.dt * 1000).toLocaleDateString());
      tempDataItems.push(daily.temp.day);
    });
    tempData = {
      labels: tempLabels,
      datasets: [
        {
          label: "Daily Temperature",
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
  if (dailyRain) {
    dailyRain.forEach((daily) => {
      rainLabels.push(new Date(daily.dt * 1000).toLocaleDateString());
      rainDataItems.push(daily.pop);
    });
    rainData = {
      labels: rainLabels,
      datasets: [
        {
          label: "Daily Precipitation",
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
      data-cy="daily-modal-container"
      onClose={() => setdailyModal(false)}
      onOpen={() => setdailyModal(true)}
      dailyModal={dailyModal}
      trigger={
        <Button attached="bottom" data-cy="view-button-daily" color="olive">
          Check Out Daily Forecast
        </Button>
      }
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Daily Forecast</Header>
          <Line
            data-cy="temp-daily-graph"
            height="300"
            width="700"
            data={tempData}
          />
          <Bar
            data-cy="rain-daily-graph"
            height="300"
            width="700"
            data={rainData}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default DailyModal;
