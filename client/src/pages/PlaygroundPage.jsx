/** Route "/playground" - Owner: Person 2 */
import { PlaygroundWindow } from '@/components/playground/PlaygroundWindow';
import { LogViewer } from '@/components/playground/LogViewer';
import { TelemetryCharts } from '@/components/telemetry/TelemetryCharts';

export default function PlaygroundPage() {
  return (
    <>
      <div className="page__head">
        <div>
          <h1 className="page__title">Deploy & observe</h1>
          <p className="page__lede">
            Preview the running app, stream logs and watch container load.
          </p>
        </div>
      </div>
      <PlaygroundWindow />
      <LogViewer />
      <TelemetryCharts />
    </>
  );
}
