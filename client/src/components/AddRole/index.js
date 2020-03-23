import React, {useState,Fragment} from 'react'
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { connect } from 'react-redux'


//esto hay que traerlo con un fetch
const PERMISSIONS =[
  {
    "value": 1,
    "label": "READ ARTIST"
  },
  {
    "value": 2,
    "label": "REGISTER ARTIST"
  },
  {
    "value": 3,
    "label": "UPDATE ARTIST"
  },
  {
    "value": 4,
    "label": "DELETE ARTIST"
  },
  {
    "value": 5,
    "label": "READ SONG"
  },
  {
    "value": 6,
    "label": "REGISTER SONG"
  },
  {
    "value": 7,
    "label": "UPDATE SONG"
  },
  {
    "value": 8,
    "label": "DELETE SONG"
  },
  {
    "value": 9,
    "label": "INACTIVATE SONG"
  },
  {
    "value": 10,
    "label": "READ ALBUM"
  },
  {
    "value": 11,
    "label": "REGISTER ALBUM"
  },
  {
    "value": 12,
    "label": "UPDATE ALBUM"
  },
  {
    "value": 13,
    "label": "DELETE ALBUM"
  }
]


class AddRole extends React.Component {

  constructor(){
		super()
		this.state = {
			role: {}
		};
  };
  
  	componentDidMount(){
		fetch('http://localhost:3000/roles')
			.then(response => response.json())
			.then(data => {
				this.setState({roles: data})
			});
	}


  handleSubmit = (values) => {

  }


  render() {
    const [name, changeName] = useState('')
    return (
      <Fragment>
        <div className="tc dib">
          <label for="name" class="f6 b db mb2">Create New Role</label>
          <form class="pa4 black-80">
            <div class="measure">
              <label for="name" class="f6 b db mb2">Role Name</label>
              <input id="name" class="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" aria-describedby="name-desc" />
            </div>
            <label for="name" class="f6 b db mb2">Permissions</label>
            <Select
              className="mt-4 col-md-6 col-offset-4"
              components={makeAnimated()}
              isMulti
              options={PERMISSIONS}
            />
            <button
              className="b ph3 pv2 input-reset ba b--green green bg-transparent grow pointer f6 dib ma2"
              onClick={console.log()}
            >
              Create
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = ({ user }) => {
  const { authUser } = user;
  return { authUser };
};

export default connect(mapStateToProps)(AddRole);
