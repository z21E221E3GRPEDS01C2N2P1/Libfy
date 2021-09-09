
<template>
  <div>
    <Chat
      :participants="participants"
      :myself="myself"
      :messages="messages"
      :onType="onType"
      :onMessageSubmit="onMessageSubmit"
      :chatTitle="chatTitle"
      :placeholder="placeholder"
      :colors="colors"
      :borderStyle="borderStyle"
      :hideCloseButton="hideCloseButton"
      :closeButtonIconSize="closeButtonIconSize"
      :submitIconSize="submitIconSize"
    />
  </div>
</template>
<script>
import { Chat } from "vue-quick-chat";
import estiloChat from "./ChatQuick.css";
import { apiD_chat } from "../const";
export default {
  components: {
    Chat
  },
  props: ["propmensagns"],
  computed: {
    usuarioatual() {}
  },
  data() {
    return {
      ...estiloChat,
      visible: true,
      participants: [],
      myself: {},
      messages: [],
      toLoad: [],

      // there are other options, you can check them here
      // https://soapbox.github.io/linkifyjs/docs/options.html
      linkOptions: {
        myself: {
          className: "myLinkClass",
          events: {
            click: function(e) {
              alert("Link clicked!");
            },
            mouseover: function(e) {
              alert("Link hovered!");
            }
          },
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          }
        },
        others: {
          className: "othersLinkClass",
          events: {
            click: function(e) {
              alert("Link clicked!");
            },
            mouseover: function(e) {
              alert("Link hovered!");
            }
          },
          format: function(value, type) {
            if (type === "url" && value.length > 50) {
              value = value.slice(0, 50) + "…";
            }
            return value;
          }
        }
      }
    };
  },
  methods: {
    onType: function(event) {
      //here you can set any behavior
    },
    loadMoreMessages(resolve) {
      setTimeout(() => {
        resolve(this.toLoad); //We end the loading state and add the messages
        //Make sure the loaded messages are also added to our local messages copy or they will be lost
        this.messages.unshift(...this.toLoad);
        this.toLoad = [];
      }, 1000);
    },
    onMessageSubmit: function(message) {
      /*
       * example simulating an upload callback.
       * It's important to notice that even when your message wasn't send
       * yet to the server you have to add the message into the array
       */
      this.messages.push(message);

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      setTimeout(() => {
        message.uploaded = true;
      }, 2000);
    },
    onClose() {
      this.visible = false;
    },
    onImageSelected(files, message) {
      let src =
        "https://149364066.v2.pressablecdn.com/wp-content/uploads/2017/03/vue.jpg";
      this.messages.push(message);
      /**
       * This timeout simulates a requisition that uploads the image file to the server.
       * It's up to you implement the request and deal with the response in order to
       * update the message status and the message URL
       */
      setTimeout(
        res => {
          message.uploaded = true;
          message.src = res.src;
        },
        3000,
        { src }
      );
    },
    onImageClicked(message) {
      /**
       * This is the callback function that is going to be executed when some image is clicked.
       * You can add your code here to do whatever you need with the image clicked. A common situation is to display the image clicked in full screen.
       */
      console.log("Image clicked", message.src);
    },
    carregaParticipantesChat() {
      let fdatabase = this.$firebase.firestore();

      fdatabase
        .collection("themidnight")
        .doc("participnts")
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data().partcps);
            debugger;
            this.participants = doc.data().partcps;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(error => {
          console.log("Error getting document:", error);
        });
    }
  },
  mounted() {
    let {participants,myself,messages,toLoad} =  apiD_chat.chatplaceholder
    this.participants = participants
    this.myself = myself
    this.messages = messages
    this.toLoad = toLoad 
  }
};
</script>
<style scoped>
@import "ChatQuickNpm.css";
.material-design-icon,
.image-icon {
  border: 1px solid red;
}
</style>