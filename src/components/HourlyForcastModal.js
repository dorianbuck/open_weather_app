import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import { Line } from "react-chartjs-2";

function HourlyModal({ tempData }) {
  const [hourlyModal, setHourlyModal] = React.useState(false);

  return (
    <Modal
      onClose={() => setHourlyModal(false)}
      onOpen={() => setHourlyModal(true)}
      hourlyModal={tempData}
      trigger={
        <Button attached="right" positive className="modal-button">
          Check Out Hourly Forcast
        </Button>
      }
    >
      <Modal.Content>
        <Modal.Description>
          <Header>Hourly Forcast</Header>
          <Line
            canvas
            height="400"
            width="800"
            data-testid="canvas"
            data={tempData}
            // options={options}
          />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default HourlyModal;
