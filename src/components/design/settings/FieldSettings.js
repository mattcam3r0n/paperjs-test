import React from 'react';
import ColorPicker from './ColorPicker';
import { observer, inject } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Themes from './FieldThemes';

const styles = (theme) => ({});

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
        marginTop: 10,
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
    <Grid item xs={props.xs || 2}>
      {props.children}
    </Grid>
  );
};

@inject('fieldState')
@observer
class FieldSettings extends React.Component {
  state = {
    themeName: this.props.fieldState.fieldSettings.theme || 'default',
  };

  setFieldSettings = (settings) => {
    const { fieldState } = this.props;
    fieldState.setFieldSettings(settings);
  };

  handleCustomChange = (settings) => {
    settings.theme = 'custom';
    this.setState({
      themeName: settings.theme,
    });
    this.setFieldSettings(settings);
  };

  handleThemeChange = (e) => {
    const theme = Themes[e.target.value];
    this.setState({
      themeName: e.target.value,
    });
    this.setFieldSettings(theme);
  };

  render() {
    const { fieldSettings } = this.props.fieldState;
    return (
      <React.Fragment>
        <GridContainer>
          <Row>
            <Typography variant="subtitle2" gutterBottom>
              Change field colors or choose a predefined theme:
            </Typography>
          </Row>
          <Column>
            <GridContainer>
              <Row>
                <RowLabel label="&nbsp;" />
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
                  setFieldSettings={this.handleCustomChange}
                  settingName="fieldColor"
                />
              </Row>
              <Row>
                <OpacitySlider
                  fieldSettings={fieldSettings}
                  setFieldSettings={this.handleCustomChange}
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
                  setFieldSettings={this.handleCustomChange}
                  settingName="yardlineColor"
                />
              </Row>
              <Row>
                <OpacitySlider
                  fieldSettings={fieldSettings}
                  setFieldSettings={this.handleCustomChange}
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
                  setFieldSettings={this.handleCustomChange}
                  settingName="yardlineNumberColor"
                />
              </Row>
              <Row>
                <OpacitySlider
                  fieldSettings={fieldSettings}
                  setFieldSettings={this.handleCustomChange}
                  settingName="yardlineNumberOpacity"
                />
              </Row>
            </GridContainer>
          </Column>
          <Column xs={1}>
            <GridContainer>
              <Row />
              <Row>
                <ColumnLabel label="-OR-" />
              </Row>
              <Row />
            </GridContainer>
          </Column>
          <Column>
            <GridContainer>
              <Row>
                <ColumnLabel label="Theme" />
              </Row>
              <Row>
                {/* <FormControl className={classes.formControl}> */}
                {/* <InputLabel htmlFor="age-simple">Theme</InputLabel> */}
                <Select
                  value={this.state.themeName}
                  onChange={this.handleThemeChange}
                  // inputProps={{
                  //   name: 'age',
                  //   id: 'age-simple',
                  // }}
                >
                  <MenuItem value="custom">
                    <em>Custom</em>
                  </MenuItem>
                  <MenuItem value={'default'}>Default</MenuItem>
                  <MenuItem value={'graphPaper'}>Graph Paper</MenuItem>
                  <MenuItem value={'blackAndWhite'}>Black &amp; White</MenuItem>
                </Select>
                {/* </FormControl>{' '} */}
              </Row>
              <Row />
            </GridContainer>
          </Column>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FieldSettings);
