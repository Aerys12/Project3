from .models.availability import Availability
from .models.meetingAvailability import MeetingAvailability
from datetime import timedelta
from typing import List


def suggestionTimes(calendar_availabilities: List[Availability],
                    meeting_availabilities: List[MeetingAvailability],
                    meeting_duration: int):
    intersections = []
    for c_avail in calendar_availabilities:
        for m_avail in meeting_availabilities:
            c_start = c_avail.start_time
            c_end = c_avail.end_time
            m_start = m_avail.start_time
            m_end = m_avail.end_time

            # Finding the overlapping time
            start_max = max(c_start, m_start)
            end_min = min(c_end, m_end)

            if start_max < end_min and (end_min - start_max) >= timedelta(
                    minutes=meeting_duration):
                # There's an overlapping slot that can accommodate the meeting
                intersection = {
                    "start_time": start_max,
                    "end_time": end_min,
                    "preference": c_avail.preference + m_avail.preference
                }
                intersections.append(intersection)
                intersections.sort(
                    key=lambda x: (-x['preference'], x['start_time']))

    if intersections:
        best_slot = intersections[0]
        print(intersections)
        return {
            "start_time": best_slot['start_time'].strftime(
                "%Y-%m-%dT%H:%M:%SZ"),
            "end_time": (best_slot['start_time'] + timedelta(
                minutes=meeting_duration)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "preference": best_slot['preference']
        }

    return {}
