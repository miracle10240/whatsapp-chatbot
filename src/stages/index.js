import { initialStage } from './0.js';
import { stageOne } from './1.js';
import { stageTwo } from './2.js';
import { stageThree } from './3.js';
import { stageFour } from './4.js';
import { finalStage } from './5.js';
async function start(client) {
  await client.onMessage(async (message) => {
    try {
      const currentStage = getStage({ from: message.from });

      const messageResponse = stages[currentStage].stage.exec({
        from: message.from,
        message: message.body,
        client,
      });

      if (messageResponse) {
        await client.sendText(message.from, messageResponse);
      }
    } catch (error) {
      client.close();
    }
  });

  process.on('SIGINT', function () {
    client.close();
  });
}
export { initialStage, stageOne, stageTwo, stageThree, stageFour, finalStage, start };
