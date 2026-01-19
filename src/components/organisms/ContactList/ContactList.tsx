import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from "react";
import apiData from "src/api";
import { Button } from "src/components/atoms/Button";
import { Heading } from "src/components/atoms/Heading";
import { ContactItem } from "src/components/molecules/ContactItem";
import { ErrorState } from "src/components/molecules/ErrorState";
import { LoadingState } from "src/components/molecules/LoadingState";

import { type Contact } from "src/types";

export const ContactList = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState<Contact[]>([]);
    const [selected, setSelected] = useState<Map<string, number>>(new Map());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    const savedScrollPosition = useRef<number | null>(null);
    const initialFetchDone = useRef(false);
    const selectionCounter = useRef(0);
  
    const fetchData = useCallback(async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiData();
        setData((prevData) => [...prevData, ...response.contacts]);
        setTotal(response.total);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
      } finally {
        setLoading(false);
      }
    }, []);

    const handleSelect = useCallback((id: string) => {
      savedScrollPosition.current = window.scrollY;
      
      setSelected(prev => {
        const next = new Map(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          selectionCounter.current += 1;
          next.set(id, selectionCounter.current);
        }
        return next;
      });
    }, []);
    
    useLayoutEffect(() => {
        if (savedScrollPosition.current !== null) {
            window.scrollTo(0, savedScrollPosition.current);
            savedScrollPosition.current = null;
        }
    }, [selected]);
  
    useEffect(() => {
      if (initialFetchDone.current) return;
      initialFetchDone.current = true;
      fetchData();
    }, [fetchData]);

    const sortedContacts = useMemo(() => 
      [...data].sort((a, b) => {
        const aOrder = selected.get(a.id);
        const bOrder = selected.get(b.id);
        
        if (aOrder !== undefined && bOrder !== undefined) {
          return bOrder - aOrder;
        }
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;
        return 0;
      }), 
    [data, selected]);
    
    return (
        <div className="contact-list">
            {error ? <ErrorState error={error} fetchData={fetchData}/> : null}
            {loading ? <LoadingState /> : null}
            <div className="contact-list__header">
                <Heading as="h1" className="contact-list__counter">Selected contacts: <span data-testid="selected-contacts-counter">{selected.size}</span></Heading>
            </div>
            <ul className="contact-list__items">
            {sortedContacts.map((personInfo) => (
                <ContactItem key={personInfo.id} contact={personInfo} onSelect={handleSelect} isSelected={selected.has(personInfo.id)} />
            ))}
            </ul>
            {data.length > 0 && data.length < total ? <Button testId="load-more-button" onClick={fetchData} disabled={loading || !!error}>Load more</Button> : null}
        </div>
    );
};