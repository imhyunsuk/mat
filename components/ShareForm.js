import React, { useState, useEffect } from "react";
import {
  Alert,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
import fetch from "isomorphic-unfetch"
import { useRouter } from 'next/router'
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const SHARE = gql`
  mutation Share($URL: String!) {
    share(URL: $URL) {
      URL
    }
  }
`;

const CANCEL_SHARE = gql`
  mutation CancelShare {
    cancelShare {
      URL
    }
  }
`;

const GET_MY_URL = gql`
  query {
    currentUser {
      id
      URL
    }
  }
`;


const ShareForm = () => {
  const [isShared, setIsShared] = useState(false)
  const [shortURL, setShortURL] = useState('')
  const [
    share,
    { loading: shareLoading, error: shareError }
  ] = useMutation(SHARE);
  const [
    cancelShare,
    { loading: cancelLoading, error: cancelError }
  ] = useMutation(CANCEL_SHARE);
  const { loading, error, data, refetch } = useQuery(GET_MY_URL);

  const clickCopy = async () => {
    const url = document.getElementById("shareURL");

    url.select();
    url.setSelectionRange(0, 9999);
    document.execCommand("copy");
  }

  const generateMyURL = async (id) => {
    const link = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer fa2220f53ab787fff55a0f1d136ff45fffbd9341',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        group_guid: 'Bjcu6KtruIV',
        long_url: `${window.location.origin}/mobile/map?id=${id}`,
      })
    }).then(response => {
      return response.json();
    }).then(data => data.link)

    await share({
      variables: { URL: link } 
    }).then(response => {
      setShortURL(response.data.share.URL);
    })
  }

  const clickShare = async () => {
    generateMyURL(data.currentUser.id);
  }

  const clickCancel = async () => {
    await cancelShare().then(response => {
      if(!response.data.cancelShare.URL) setShortURL('')
    })
  }

  useEffect(() => {
    if (data && data.currentUser) {
      setShortURL(data.currentUser.URL);
    }
  }, [data])
  // await fetch('https://api-ssl.bitly.com/v4/groups', {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': 'Bearer fa2220f53ab787fff55a0f1d136ff45fffbd9341',
  //     'Content-Type': 'application/json'
  //   },
  // }).then(response => {
  //   return response.json();
  // }).then(data => {
  //   console.log(data.groups[0].guid)
  // })
  // }

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <Container fluid>
      {shortURL ? 
        (
          <React.Fragment>
            <InputGroup className='my-5'>
              <Input id="shareURL" value={shortURL} bsSize="lg" readOnly />
              <InputGroupAddon addonType="append">
                <Button onClick={clickCopy} color="info" outline>복사</Button>
              </InputGroupAddon>
            </InputGroup>
            <Button onClick={clickCancel} block color="info" size="lg">
              취소하기
            </Button>
            <div className="my-5">
              <Alert color="success" fade>내 맛집을 공유중입니다.</Alert>
            </div>
          </React.Fragment>
        ) : 
        (
          <React.Fragment>
            <InputGroup className='my-5'>
              <Input id="shareURL" value={''} bsSize="lg" readOnly />
              <InputGroupAddon addonType="append">
                <Button onClick={clickCopy} color="info" outline>복사</Button>
              </InputGroupAddon>
            </InputGroup>
            <Button onClick={clickShare} block color="info" outline size="lg">
              공유하기
            </Button>
            <div className="my-5">
              <Alert color="danger" fade>내 맛집 정보를 공유하지 않고 있습니다.</Alert>
            </div>
          </React.Fragment>
        )
      }

      <style jsx>{`

      `}</style>
    </Container>
  );
};

export default ShareForm;
