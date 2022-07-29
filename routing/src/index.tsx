import * as forgo from "forgo";
import { mount, Component } from "forgo";
import { Router, matchUrl, matchExactUrl, Link } from "forgo-router";
import type { ForgoNewComponentCtor } from "forgo";

type Customer = {
  id: number;
  name: string;
  age: number;
};

const customers = [
  { id: 1, name: "Kai", age: 3 },
  { id: 2, name: "Jeswin", age: 40 },
  { id: 3, name: "Deepsta", age: 42 },
];

const App: ForgoNewComponentCtor = () => {
  return new Component({
    render() {
      return (
        <Router>
          <Link href="/">Home Page</Link>
          {matchExactUrl("/", () => <Home />) ||
            matchUrl("/customers", (match) => <Customers />) ||
            matchUrl("/about", () => <AboutPage />)}
        </Router>
      );
    },
  });
};

const Home: ForgoNewComponentCtor = () => {
  return new Component({
    render() {
      return (
        <div>
          <h1>Home Page</h1>
          <p>Welcome to Forgo Examples Inc.</p>
          <ul>
            <li>
              Go to <Link href="/customers">Customers</Link>
            </li>
            <li>
              Go to the <Link href="/about">About Page</Link>
            </li>
          </ul>
        </div>
      );
    },
  });
};

const Customers: ForgoNewComponentCtor = () => {
  return new Component({
    render() {
      return (
        <div>
          <h1>Customers Module</h1>
          <div>
            {matchExactUrl("/customers", () => (
              <CustomerList customers={customers} />
            )) ||
              matchExactUrl("/customers/:id", (match) => (
                <CustomerDetails id={match.params.id} />
              ))}
          </div>
        </div>
      );
    },
  });
};

interface CustomersProps {
  customers: Customer[];
}

export const CustomerList: ForgoNewComponentCtor<CustomersProps> = () => {
  return new Component({
    render(props: CustomersProps) {
      return (
        <div>
          <h2>List of Customers</h2>
          <ul>
            {props.customers.map((c) => (
              <li>
                <Link href={`/customers/${c.id}`}>
                  {c.name}({c.age})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    },
  });
};

interface CustomerDetailsProps {
  id: string;
}

export const CustomerDetails: ForgoNewComponentCtor<CustomerDetailsProps> = (
  props
) => {
  return new Component({
    render(props: CustomerDetailsProps) {
      const customer = customers.find((c) => c.id.toString() === props.id);
      return (
        <div>
          <h2>Customer Details</h2>
          {customer ? (
            <p>
              Details for {customer.name}. Id: {customer.id}, Age:{" "}
              {customer.age}
            </p>
          ) : (
            <p>Missing customer.</p>
          )}
        </div>
      );
    },
  });
};

export const AboutPage: ForgoNewComponentCtor = () => {
  return new Component({
    render() {
      return (
        <div>
          <h1>About Page</h1>
          <p>Hello, world</p>
        </div>
      );
    },
  });
};

function ready(fn: any) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

ready(() => {
  mount(<App />, document.getElementById("root"));
});
