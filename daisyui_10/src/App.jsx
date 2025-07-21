import './App.css'
import NavBar from './navbar/NavBar'


function App() {







    return (
        <>


            <NavBar title="New World"></NavBar>

            <div className="m-2" data-theme="dark">
                <button class="btn btn-primary" onClick={() => alert('Scores were not submitted!') } >Submit my rating</button>
            </div>

        </>
    )
}
export default App