import { Dimmer, Loader } from 'semantic-ui-react';

export default function LoadingComponent({
  inverted = true,
  content = 'Loading...',
  size = 'huge',
}) {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} size={size} />
    </Dimmer>
  );
}
