import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import Navigation from "./src/Navigation/Navigation";
import { ActivityIndicator } from "react-native";
import { createUser, getUser } from "./Queries/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Context from "./src/Context/Context";
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});
import Client from "./src/Client/Client";
const App = () => {
  return (
    <Context>
      <Client>
        <Navigation />
      </Client>
    </Context>
  );
};
export default withAuthenticator(App);
