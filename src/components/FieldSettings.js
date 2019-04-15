import React from 'react';
import ColorPicker from './ColorPicker';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
});

const GridContainer = (props) => {
  return (
    <Grid container spacing={16}>
      {props.children}
    </Grid>
  );
};

const FieldSettingColorPicker = (props) => {
  const { fieldSettings, setFieldSettings, settingName } = props;
  return (
    <ColorPicker
      selectedColor={fieldSettings[settingName]}
      onChange={(color) => {
        setFieldSettings({
          [settingName]: color.hex,
        });
      }}
    />
  );
};

const OpacitySlider = (props) => {
  const { fieldSettings, setFieldSettings, settingName } = props;
  return (
    <Slider
      value={fieldSettings[settingName]}
      min={0}
      max={1}
      step={0.05}
      onChange={(event, value) => {
        setFieldSettings({
          [settingName]: value,
        });
      }}
      style={{
        marginTop: 10
      }}
    />
  );
};

const RowLabel = (props) => {
  return (
    <Typography variant="caption" gutterBottom>
      {props.label}
    </Typography>
  );
};

const ColumnLabel = (props) => {
  return (
    <Typography variant="button" gutterBottom align="center">
      {props.label}
    </Typography>
  );
};

const Row = (props) => {
  return (
    <Grid item xs={12} style={{ height: 30 }}>
      {props.children}
    </Grid>
  );
};

const Column = (props) => {
  return (
    <Grid item xs={2}>
      {props.children}
    </Grid>
  );
};

@inject('fieldState')
@observer
class FieldSettings extends React.Component {
  setFieldSettings = (settings) => {
    const { fieldState } = this.props;
    fieldState.setFieldSettings(settings);
  };

  render() {
    const { fieldSettings } = this.props.fieldState;
    return (
      <GridContainer>
        <Column>
          <GridContainer>
            <Row>
              <RowLabel label="Setting" />
            </Row>
            <Row>
              <RowLabel label="Color" />
            </Row>
            <Row>
              <RowLabel label="Opacity" />
            </Row>
          </GridContainer>
        </Column>
        <Column>
          <GridContainer>
            <Row>
              <ColumnLabel label="Field" />
            </Row>
            <Row>
              <FieldSettingColorPicker
                fieldSettings={fieldSettings}
                setFieldSettings={this.setFieldSettings}
                settingName="fieldColor"
              />
            </Row>
            <Row>
            <OpacitySlider
                fieldSettings={fieldSettings}
                setFieldSettings={this.setFieldSettings}
                settingName="fieldOpacity"
              />
            </Row>
          </GridContainer>
        </Column>
        <Column>
          <GridContainer>
            <Row>
              <ColumnLabel label="Yardlines" />
            </Row>
            <Row>
              <FieldSettingColorPicker
                fieldSettings={fieldSettings}
                setFieldSettings={this.setFieldSettings}
                settingName="yardlineColor"
              />
            </Row>
            <Row>
            <OpacitySlider
                fieldSettings={fieldSettings}
                setFieldSettings={this.setFieldSettings}
                settingName="yardlineOpacity"
              />
            </Row>
          </GridContainer>
        </Column>
        <Column>
          <GridContainer>
            <Row>
              <ColumnLabel label="Numbers" />
            </Row>
            <Row>
              <FieldSettingColorPicker
                fieldSettings={fieldSettings}
                setFieldSettings={this.setFieldSettings}
                settingName="yardlineNumberColor"
              />
            </Row>
            <Row>
            <OpacitySlider
                fieldSettings={fieldSettings}
                setFieldSettings={this.setFieldSettings}
                settingName="yardlineNumberOpacity"
              />
            </Row>
          </GridContainer>
        </Column>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(FieldSettings);
