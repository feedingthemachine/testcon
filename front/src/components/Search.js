import React, {Component} from 'react';
import { Parser } from 'html-to-react';
import { getFarmacias } from '../services/farmacias_service';
import { getComunas } from '../services/comunas_service';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import {Container, Row, Card, Button, Form, Badge} from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";

class Search extends Component {

    constructor(props) {
      super(props);
      this.state = {
        comunas: [],
        farmacias: [],
      }
      this.search = this.search.bind(this);
      this.obtenerComunas = this.obtenerComunas.bind(this);
    }

    componentDidMount = () => {
      this.obtenerComunas(7);
    }

    search = (values, cb) => {
      if (process.env.REACT_APP_DO_MOCK === '1') {
        this.setState({farmacias: [
          {
            name: 'Farmacias Ahumada',
            address: 'Fco Bilbao y la concha de tu madre',
            telephone: 945607930,
            position:
            {
              lat: -33.425986,
              lng: -70.577036
            }
          },
          {
            name: 'Farmacias Ahumada',
            address: 'Fco Bilbao y la concha de tu madre',
            telephone: 945607930,
            position:
            {
              lat: -33.425986,
              lng: -70.577036
            }
          },
          {
            name: 'Farmacias Ahumada',
            address: 'Fco Bilbao y la concha de tu madre',
            telephone: 945607930,
            position:
            {
              lat: -33.425986,
              lng: -70.577036
            }
          },
          {
            name: 'Farmacias Ahumada',
            address: 'Fco Bilbao y la concha de tu madre',
            telephone: 945607930,
            position:
            {
              lat: -33.425986,
              lng: -70.577036
            }
          },
          {
            name: 'Farmacias Ahumada',
            address: 'Fco Bilbao y la concha de tu madre',
            telephone: 945607930,
            position:
            {
              lat: -33.425986,
              lng: -70.577036
            }
          },
          {
            name: 'Farmacias Ahumada',
            address: 'Fco Bilbao y la concha de tu madre',
            telephone: 945607930,
            position:
            {
              lat: -33.425986,
              lng: -70.577036
            }
          }
        ]});
      } else {
        this.obtenerFarmacias({
          idComuna: parseInt(values.comuna, 10),
	        nombreLocal: values.local
        });
      }
      cb(false);
    }

    obtenerComunas = async (region) => {
      try {
        const comunas = await getComunas(region);
        if (comunas) {
          const htmlToReactParser = new Parser();
          const reactElement = htmlToReactParser.parse(comunas);
          this.setState({ comunas: reactElement });
        }
      } catch (error) {
        console.error(error);
      }
    }

    obtenerFarmacias = async (req) => {
      try {
        const farmacias = await getFarmacias(req);
        this.setState({ farmacias : farmacias.data });
      } catch (error) {
        console.error(error);
      }
    }

    render() {
      const { comunas, farmacias } =  this.state;
        return (
          <Container className="container">
              <Card style={{ width: '20rem', minWidth: '15em', height: '25rem' }}>
                <Card.Img />
                <Card.Body style={{ margin: '1em'}}>
                  <Card.Title>
                    <Row className="justify-content-md-center">
                      Buscar Farmacias
                    </Row>
                  </Card.Title>
                    <Row className="justify-content-md-center">
                      <Formik
                        initialValues={{ comuna: '', local: '' }}
                        onSubmit={(values, { setSubmitting }) => this.search(values, setSubmitting)}
                        validationSchema={Yup.object().shape({
                          comuna: Yup.string().required('Required'),
                          local: Yup.string().required('Required'),
                        })}
                      >
                        {props => {
                          const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            setFieldTouched,
                          } = props;
                          return (
                            <Form noValidate onSubmit={handleSubmit}>
                              <Form.Group>
                                <Form.Label>Comuna:</Form.Label>
                                <Form.Control id="comuna" as="select" placeholder="SANTIAGO" onChange={e => {
                                      // call the built-in handleBur
                                      handleChange(e);
                                      if (e.target.value==='0') {
                                        setFieldValue('comuna','');
                                        setFieldTouched('comuna', false);
                                      }
                                  }}
                                  onBlur={handleBlur} value={values.comuna} defaultValue="0" required className={
                                    errors.comuna && touched.comuna ? 'text-input error' : 'text-input'
                                  }>
                                  { comunas }
                                </Form.Control>
                                {errors.comuna && touched.comuna && (
                                  <Badge variant="warning">{errors.comuna}</Badge>
                                )}
                              </Form.Group>
                              <Form.Group>
                                <Form.Label>Local:</Form.Label>
                                <Form.Control id="local" value={values.local} placeholder="Farmacias Ahumada" onChange={handleChange}
                                  onBlur={handleBlur} required className={
                                    errors.local && touched.local ? 'text-input error' : 'text-input'
                                  }/>
                                {errors.local && touched.local && (
                                  <Badge variant="warning">{errors.local}</Badge>
                                )}
                              </Form.Group>
                              <Row className="justify-content-md-center middle">
                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                  Buscar
                                </Button>
                              </Row>
                            </Form>
                          );
                        }}
                      </Formik>
                    </Row>
                </Card.Body>
              </Card>
              <div className="map-container">
              {
                farmacias.map((value, key) => {
                  return ( 
                    <Card id={'map_card_'+key}>
                      <Card.Body>
                        <Card.Title>
                          <div className="farmacia-titulo">
                            <div ><Badge variant="info">Nombre del local</Badge>
                              <Badge variant="light">{value.name}</Badge></div>
                            <div ><Badge variant="info">Teléfono</Badge>
                              <Badge variant="light">{value.telephone}</Badge></div>
                            <div ><Badge variant="info">Dirección</Badge>
                              <Badge variant="light">{value.address}</Badge></div>
                          </div>
                        </Card.Title>
                        <div className="middle">
                          <LoadScript
                              id='loadscript'
                              googleMapsApiKey="AIzaSyB3XqNV2ScwOay8ww8UQ4sEZ-nX6gytTFQ"
                            >
                            <GoogleMap
                                  id={'gmp_'+key}
                                  zoom={15}
                                  center={value.position}
                                  mapContainerClassName='map'
                                >
                                  <Marker
                                    key={'mrk_'+key}
                                    position={value.position}
                                  />
                                </GoogleMap> 
                            </LoadScript>
                        </div>
                      </Card.Body>
                    </Card>)
                  })
                }
                </div>
          </Container>
        );
    }
}

export default Search;