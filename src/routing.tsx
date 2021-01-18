import { mount } from "forgo";
import { matchUrl, matchExactUrl, Link } from "forgo-router";

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

function App() {
  return {
    render() {
      return (
        <div>
          <Link href="/">Home Page</Link>
          {matchExactUrl("/", () => <Home />) ||
            matchUrl("/customers", (match) => <Customers />) ||
            matchUrl("/about", () => <AboutPage />)}
        </div>
      );
    },
  };
}

function Home() {
  return {
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
  };
}

function Customers() {
  return {
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
  };
}

type CustomersProps = {
  customers: Customer[];
};

export function CustomerList(props: CustomersProps) {
  return {
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
  };
}

type CustomerDetailsProps = {
  id: string;
};

export function CustomerDetails(props: CustomerDetailsProps) {
  return {
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
  };
}

export function AboutPage() {
  return {
    render() {
      return (
        <div>
          <h1>About Page</h1>
          <p>Hello, world</p>
        </div>
      );
    },
  };
}

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
